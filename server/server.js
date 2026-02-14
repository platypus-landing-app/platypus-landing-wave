// server.js
import express from "express";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import cors from "cors";
import { MongoClient } from "mongodb";
import { createHash } from "crypto";
import rateLimit from "express-rate-limit";
import axios from "axios";
import admin from "firebase-admin";

dotenv.config();

// Import Telegram utilities AFTER dotenv.config() so env vars are available
import { sendBookingNotification, sendPartialLeadNotification, sendTestNotification, sendApplicationNotification } from "./utils/telegram.js";

// --- MongoDB Connection ---
let db;
async function connectDB() {
    try {
        console.log('Environment variables loaded:');
        console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
        console.log('MONGODB_URI (masked):', process.env.MONGODB_URI?.replace(/\/\/.*:.*@/, '//[USER]:[PASS]@'));

        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db(process.env.DB_NAME || "platypus");
        console.log("✅ MongoDB connected");

        // Create indexes for partial_leads collection
        await db.collection("partial_leads").createIndex({ phone: 1 }, { unique: true });
        await db.collection("partial_leads").createIndex({ email: 1 });
        await db.collection("partial_leads").createIndex({ status: 1 });
        await db.collection("partial_leads").createIndex({ created_at: 1 });
        console.log("✅ Indexes created for partial_leads collection");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

// --- Firebase Admin SDK Setup ---
try {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
    console.log("✅ Firebase Admin SDK initialized");
} catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
}

// --- Express Setup ---
const app = express();
app.use(express.json());

// CORS configuration with proper multiple origin handling
const allowedOrigins = process.env.CORS_URI
    ? process.env.CORS_URI.split(',').map(origin => origin.trim())
    : ['*'];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    })
);

// --- Rate Limiting Configuration ---
// Global rate limit: 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { success: false, message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

// Booking-specific rate limit: 3 submissions per 5 minutes per IP
const bookingLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3,
    message: {
        success: false,
        message: "Too many booking attempts. Please wait 5 minutes before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// OTP send rate limit: 5 OTP requests per 15 minutes per IP
const otpSendLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        message: "Too many OTP requests. Please wait before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// OTP verify rate limit: 10 verification attempts per 15 minutes per IP
const otpVerifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: {
        success: false,
        message: "Too many verification attempts. Please request a new OTP."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalLimiter);

// --- Health Check Endpoint ---
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: db ? 'connected' : 'disconnected',
        service: 'platypus-backend'
    });
});

// --- Test Telegram Bot Endpoint ---
app.get('/api/test-telegram', async (req, res) => {
    try {
        await sendTestNotification();
        res.status(200).json({
            success: true,
            message: 'Telegram test notification sent! Check your Telegram.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Telegram test failed',
            error: error.message
        });
    }
});

// --- Cleanup Job for Old Partial Leads (90 days) ---
async function cleanupOldPartialLeads() {
    try {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const result = await db.collection("partial_leads").deleteMany({
            created_at: { $lt: ninetyDaysAgo },
            status: { $in: ["partial", "contacted"] } // Only delete unresolved leads
        });

        if (result.deletedCount > 0) {
            console.log(`🗑️  Cleaned up ${result.deletedCount} partial leads older than 90 days`);
        }
    } catch (error) {
        console.error("❌ Cleanup job error:", error);
    }
}

// Run cleanup daily at 2 AM
setInterval(cleanupOldPartialLeads, 24 * 60 * 60 * 1000);
// Run immediately on startup
setTimeout(cleanupOldPartialLeads, 5000);

// --- Track Partial Lead (Before Phone Verification) ---
app.post("/api/leads/track-partial", async (req, res) => {
    try {
        const { fullName, email, phone, dogs, preferredDate, timeSlot, location, stepReached } = req.body;

        // At minimum, we need some identifying information
        if (!fullName && !email && !phone) {
            return res.status(400).json({
                success: false,
                message: "At least one identifying field (name, email, or phone) is required"
            });
        }

        // Create partial lead data
        const partialLeadData = {
            full_name: fullName || null,
            email: email || null,
            phone: phone || null,
            status: "partial",
            step_reached: stepReached || 0,
            form_data: {
                dogs: dogs || [],
                preferredDate: preferredDate || null,
                timeSlot: timeSlot || null,
                location: location || null
            },
            metadata: {
                ip_address: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                user_agent: req.headers['user-agent'] || 'unknown',
                page_url: req.headers.referer || 'unknown'
            },
            last_updated: new Date()
        };

        // Try to find existing partial lead (by phone, email, or name)
        let query = {};
        if (phone) query.phone = phone;
        else if (email) query.email = email;
        else if (fullName) query.full_name = fullName;

        const existing = await db.collection("partial_leads").findOne(query);

        if (existing) {
            // Update existing
            await db.collection("partial_leads").updateOne(
                { _id: existing._id },
                {
                    $set: partialLeadData,
                    $setOnInsert: { created_at: existing.created_at }
                }
            );
            console.log(`✅ Updated partial lead for ${fullName || email || phone}`);
        } else {
            // Create new
            partialLeadData.created_at = new Date();
            partialLeadData.contact_attempts = 0;
            await db.collection("partial_leads").insertOne(partialLeadData);
            console.log(`✅ Created new partial lead for ${fullName || email || phone}`);

            // Send Telegram notification for new partial leads (non-blocking)
            sendPartialLeadNotification(partialLeadData).catch(err => {
                console.error('⚠️  Telegram partial lead notification failed:', err.message);
            });
        }

        res.status(200).json({
            success: true,
            message: "Progress saved"
        });
    } catch (error) {
        console.error("❌ Track partial lead error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save progress"
        });
    }
});

// --- Firebase Phone Verification and Save Partial Lead Endpoint ---
app.post("/api/leads/verify-phone-and-save", otpVerifyLimiter, async (req, res) => {
    try {
        const { idToken, phone, fullName, email, whatsappEnabled, formData } = req.body;

        // Validate required fields
        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "Firebase ID token is required."
            });
        }

        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number format."
            });
        }

        // Verify Firebase ID token
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log(`✅ Firebase token verified for phone: ${decodedToken.phone_number}`);
        } catch (error) {
            console.error(`❌ Firebase token verification failed:`, error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired authentication token."
            });
        }

        // Verify the phone number matches
        const verifiedPhone = decodedToken.phone_number?.replace('+91', '');
        if (verifiedPhone !== phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number mismatch."
            });
        }

        console.log(`✅ Phone verified successfully: ${phone}`);

        // Check if already exists in completed bookings
        const existingBooking = await db.collection("dog_bookings").findOne({ mobile: phone });
        if (existingBooking) {
            console.log(`ℹ️  Phone ${phone} already has completed booking, skipping partial lead save`);
            return res.status(200).json({
                success: true,
                message: "Phone verified successfully",
                verified: true,
                alreadyCustomer: true
            });
        }

        // Check if already exists in partial_leads
        const existingPartialLead = await db.collection("partial_leads").findOne({ phone });

        const partialLeadData = {
            phone,
            email: email || null,
            full_name: fullName || null,
            whatsapp_enabled: whatsappEnabled || false,
            status: "verified",
            step_reached: 1,
            form_data: formData || {},
            firebase_uid: decodedToken.uid,
            metadata: {
                ip_address: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                user_agent: req.headers['user-agent'] || 'unknown',
                page_url: req.headers.referer || 'unknown',
                referrer: req.headers.referer || 'unknown'
            },
            last_updated: new Date(),
            contact_attempts: 0
        };

        if (existingPartialLead) {
            // Update existing partial lead
            await db.collection("partial_leads").updateOne(
                { phone },
                {
                    $set: partialLeadData,
                    $setOnInsert: { created_at: existingPartialLead.created_at }
                }
            );
            console.log(`✅ Updated existing partial lead for ${phone}`);
        } else {
            // Create new partial lead
            partialLeadData.created_at = new Date();
            await db.collection("partial_leads").insertOne(partialLeadData);
            console.log(`✅ Created new partial lead for ${phone}`);
        }

        res.status(200).json({
            success: true,
            message: "Phone verified and information saved successfully",
            verified: true
        });
    } catch (error) {
        console.error("❌ Phone verification error:", error);

        res.status(500).json({
            success: false,
            message: "Verification failed. Please try again.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// --- reCAPTCHA Verification Function ---
async function verifyRecaptcha(token) {
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.warn("⚠️ RECAPTCHA_SECRET_KEY not set, skipping verification");
            return { success: true, score: 1.0 }; // Allow in development
        }

        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: secretKey,
                    response: token,
                }
            }
        );

        const data = response.data;

        if (!data.success) {
            console.error("❌ reCAPTCHA verification failed:", data["error-codes"]);
            return { success: false, score: 0, errors: data["error-codes"] };
        }

        console.log(`✅ reCAPTCHA verified - Score: ${data.score}, Action: ${data.action}`);
        return { success: true, score: data.score, action: data.action };
    } catch (error) {
        console.error("❌ reCAPTCHA verification error:", error.message);
        return { success: false, score: 0, error: error.message };
    }
}

// --- Generate Content Hash (to detect duplicate vs. changed submissions) ---
function generateBookingHash(booking) {
    const relevantData = {
        fullName: booking.fullName,
        email: booking.email,
        dogs: booking.dogs,
        preferredDate: booking.preferredDate,
        timeSlot: booking.timeSlot,
        location: booking.location
    };
    const dataString = JSON.stringify(relevantData);
    return createHash('sha256').update(dataString).digest('hex');
}

// --- Email Function ---
async function sendBookingEmail(values) {
    try {
        let defaultClient = SibApiV3Sdk.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = {
            sender: {
                email: process.env.BREVO_SENDER_EMAIL,
                name: "Platypus- New Registration",
            },
            to: [{ email: process.env.RECEIVER_EMAIL}],
            subject: `🐶 New Trial Walk Booking - ${values.fullName}`,
            htmlContent: `
  <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; background: #fafafa;">
    <h2 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #f0c14b; padding-bottom: 10px;">
      🐶 New Trial Walk Booking
    </h2>

    <h3 style="color: #e67e22; margin-top: 20px;">👤 Owner Details</h3>
    <p><strong>Full Name:</strong> ${values.fullName}</p>
    <p><strong>Mobile:</strong> ${values.mobile} ${
                values.whatsappEnabled ? "(WhatsApp ✅)" : ""
            }</p>
    <p><strong>Email:</strong> ${values.email || "N/A"}</p>

    <h3 style="color: #27ae60; margin-top: 20px;">🐕 Dog(s) Details</h3>
    ${values.dogs
                .map(
                    (dog, i) => `
          <div style="margin-bottom: 10px; padding: 10px; border-left: 4px solid #3498db; background: #fff;">
            <p><strong>Dog ${i + 1}:</strong> ${dog.name}, ${
                        dog.breed === "Other" ? dog.breedOther : dog.breed
                    }, Age: ${dog.age || "?"}</p>
            <p><strong>Special Notes:</strong> ${dog.specialNotes || "None"}</p>
          </div>
        `
                )
                .join("")}

    <h3 style="color: #8e44ad; margin-top: 20px;">🕐 Walk Preferences</h3>
    <p><strong>Date:</strong> ${new Date(
                values.preferredDate
            ).toDateString()}</p>
    <p><strong>Time Slot:</strong> ${values.timeSlot}</p>
    <p><strong>Location:</strong> ${values.location}</p>

    <h3 style="color: #c0392b; margin-top: 20px;">🛡️ Safety</h3>
    <p>Vaccinations up to date: ${
                values.vaccinationsUpToDate ? "✅ Yes" : "❌ No"
            }</p>
    <p>Supervise handover: ${values.superviseHandover ? "✅ Yes" : "❌ No"}</p>

    <div style="margin-top: 30px; padding: 15px; text-align: center; background: #f0f0f0; border-radius: 6px;">
      <p style="margin: 0; font-size: 14px; color: #555;">📩 This booking request was submitted via <strong>Platypus</strong>.</p>
    </div>
  </div>
`,
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("✅ Email sent successfully");
        return true;
    } catch (error) {
        console.error("❌ Email sending error:", error);
        throw error;
    }
}

// --- Service Launch Notification Subscription ---
app.post("/api/notifications/subscribe", async (req, res) => {
    try {
        const { email, service } = req.body;

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        if (!service) {
            return res.status(400).json({
                success: false,
                message: "Service name is required."
            });
        }

        // Upsert: update if exists, insert if new
        await db.collection("service_notifications").updateOne(
            { email, service },
            {
                $set: {
                    email,
                    service,
                    last_updated: new Date(),
                    ip_address: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                },
                $setOnInsert: {
                    created_at: new Date(),
                    notified: false,
                }
            },
            { upsert: true }
        );

        console.log(`✅ Notification subscription: ${email} for ${service}`);

        res.status(200).json({
            success: true,
            message: "Subscribed successfully! We'll notify you when the service launches."
        });
    } catch (error) {
        console.error("❌ Notification subscribe error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to subscribe. Please try again."
        });
    }
});

// --- Professional Application Submission ---
app.post("/api/applications/submit", bookingLimiter, async (req, res) => {
    try {
        const {
            fullName, phone, email, city, area,
            role, experience, hasOwnTransport, resume, resumeName,
            availableDays, preferredSlots, canStartImmediately,
            whyJoin, animalExperience
        } = req.body;

        // Basic validation
        if (!fullName || !phone || !email || !role) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields."
            });
        }

        // Check for duplicate application (same phone, within 24 hours)
        const existing = await db.collection("professional_applications").findOne(
            { phone },
            { sort: { created_at: -1 } }
        );

        if (existing) {
            const hoursSince = (Date.now() - existing.created_at.getTime()) / (1000 * 60 * 60);
            if (hoursSince < 24) {
                return res.status(400).json({
                    success: false,
                    message: "You've already submitted an application recently. We'll get back to you within 48 hours!"
                });
            }
        }

        const applicationData = {
            full_name: fullName,
            phone,
            email,
            city: city || 'Mumbai',
            area: area || '',
            role,
            experience,
            has_own_transport: hasOwnTransport || false,
            resume: resume || null,
            resume_name: resumeName || null,
            available_days: availableDays || [],
            preferred_slots: preferredSlots || [],
            can_start_immediately: canStartImmediately || false,
            why_join: whyJoin || '',
            animal_experience: animalExperience || '',
            status: 'new',
            created_at: new Date(),
            metadata: {
                ip_address: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                user_agent: req.headers['user-agent'] || 'unknown',
            }
        };

        const result = await db.collection("professional_applications").insertOne(applicationData);
        console.log(`✅ Application saved: ${fullName} (${role}) - ID: ${result.insertedId}`);

        // Send Telegram notification (non-blocking)
        sendApplicationNotification({ ...applicationData, _id: result.insertedId }).catch(err => {
            console.error('⚠️  Telegram application notification failed:', err.message);
        });

        // Send confirmation email via Brevo (non-blocking)
        sendApplicationConfirmationEmail(applicationData).catch(err => {
            console.error('⚠️  Application confirmation email failed:', err.message);
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully! We'll review and get back to you within 48 hours.",
            applicationId: result.insertedId,
        });
    } catch (error) {
        console.error("❌ Application submission error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit application. Please try again."
        });
    }
});

// --- Application Confirmation Email ---
async function sendApplicationConfirmationEmail(application) {
    try {
        let defaultClient = SibApiV3Sdk.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        if (!apiKey.apiKey) {
            console.warn("⚠️ BREVO_API_KEY not set, skipping confirmation email");
            return;
        }

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const roleLabels = {
            'dog-walker': 'Dog Walker (Guardian)',
            'dog-groomer': 'Dog Groomer',
            'dog-trainer': 'Dog Trainer',
            'pet-sitter': 'Pet Sitter',
        };

        const sendSmtpEmail = {
            sender: {
                email: process.env.BREVO_SENDER_EMAIL || "noreply@theplatypus.in",
                name: "Platypus",
            },
            to: [{ email: application.email, name: application.full_name }],
            subject: `Application Received - ${roleLabels[application.role] || application.role}`,
            htmlContent: `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
    <img src="https://theplatypus.in/logo.png" alt="Platypus" style="height: 50px; margin-bottom: 20px;" />
    <h2 style="color: #0088FF;">We Got Your Application!</h2>
    <p>Hi ${application.full_name},</p>
    <p>Thank you for applying to join the Platypus team as a <strong>${roleLabels[application.role] || application.role}</strong>!</p>
    <p>Our team will review your application and get back to you within <strong>48 hours</strong>.</p>
    <p>In the meantime, feel free to explore our <a href="https://theplatypus.in/blog" style="color: #0088FF;">blog</a> to learn more about what we do.</p>
    <br/>
    <p>Best,<br/>The Platypus Team</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 12px; color: #999;">This is an automated email from Platypus. Please do not reply directly.</p>
</div>`,
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`✅ Application confirmation email sent to ${application.email}`);
    } catch (error) {
        console.error("❌ Application confirmation email error:", error);
    }
}

// --- Combined Booking Route (Save to DB + Send Email) ---
app.post("/api/bookings/save-send-booking-email", bookingLimiter, async (req, res) => {
    try {
        const { recaptchaToken, ...booking } = req.body;

        // 1. Verify reCAPTCHA
        if (recaptchaToken) {
            const recaptchaResult = await verifyRecaptcha(recaptchaToken);

            if (!recaptchaResult.success) {
                return res.status(400).json({
                    success: false,
                    message: "reCAPTCHA verification failed. Please refresh and try again.",
                });
            }

            // Block if score is too low (likely bot)
            if (recaptchaResult.score < 0.3) {
                console.warn(`⚠️ Low reCAPTCHA score (${recaptchaResult.score}) for mobile: ${booking.mobile}`);
                return res.status(400).json({
                    success: false,
                    message: "Your submission appears suspicious. Please contact us directly if you're having trouble.",
                });
            }

            // Log score for monitoring
            booking.recaptchaScore = recaptchaResult.score;
        } else {
            console.warn("⚠️ No reCAPTCHA token provided");
        }

        // 2. Generate content hash for this submission
        const currentHash = generateBookingHash(booking);
        booking.contentHash = currentHash;

        // 3. Check for recent submissions from this mobile number
        const existing = await db.collection("dog_bookings").findOne(
            { mobile: booking.mobile },
            { sort: { createdAt: -1 } } // Get most recent
        );

        if (existing) {
            const hoursSinceLastSubmission = (Date.now() - existing.createdAt.getTime()) / (1000 * 60 * 60);

            // SCENARIO 1: Recent identical submission (< 24 hours, same content)
            if (hoursSinceLastSubmission < 24 && existing.contentHash === currentHash) {
                return res.status(400).json({
                    success: false,
                    message: "You've already submitted this exact booking recently. Our team will contact you soon!",
                    existingBookingId: existing._id,
                    submittedAt: existing.createdAt
                });
            }

            // SCENARIO 2: Very recent submission (< 1 hour) but different details
            if (hoursSinceLastSubmission < 1 && existing.contentHash !== currentHash) {
                console.log(`✅ Allowing updated submission within 1 hour for mobile: ${booking.mobile}`);
                // Allow - user likely correcting/updating details
            }

            // SCENARIO 3: Submission after 24 hours - always allow (repeat customer)
            if (hoursSinceLastSubmission >= 24) {
                console.log(`✅ Allowing repeat submission after ${Math.floor(hoursSinceLastSubmission)} hours for mobile: ${booking.mobile}`);
            }
        }

        // 4. Add metadata
        booking.createdAt = new Date();
        booking.ipAddress = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        booking.userAgent = req.headers['user-agent'] || 'unknown';

        // 5. Insert into MongoDB
        const result = await db.collection("dog_bookings").insertOne(booking);
        console.log("✅ Booking saved to database with ID:", result.insertedId);

        // 6. Send email
        await sendBookingEmail(booking);

        // 7. Send Telegram notification (non-blocking - don't wait for it)
        sendBookingNotification({ ...booking, _id: result.insertedId }).catch(err => {
            console.error('⚠️  Telegram notification failed (non-critical):', err.message);
        });

        res.status(201).json({
            success: true,
            message: "Booking submitted successfully! We'll contact you soon.",
            bookingId: result.insertedId,
        });
    } catch (err) {
        console.error("❌ Booking/Email error:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});