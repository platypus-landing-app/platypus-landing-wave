// server.js
import express from "express";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import cors from "cors";
import { MongoClient } from "mongodb";
import { createHash } from "crypto";
import rateLimit from "express-rate-limit";
import axios from "axios";

dotenv.config();

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
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
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