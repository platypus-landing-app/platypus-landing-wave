// server.js
import express from "express";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import cors from "cors";
import { MongoClient } from "mongodb";

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
app.use(
  cors({
    origin: process.env.CORS_URI || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

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

    <h3 style="color: #8e44ad; margin-top: 20px;">🕒 Walk Preferences</h3>
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
app.post("/api/bookings/save-send-booking-email", async (req, res) => {
  try {
    const booking = req.body;

    // Check duplicate by mobile number
    const existing = await db.collection("dog_bookings").findOne({ mobile: booking.mobile });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A booking with this mobile number already exists.",
      });
    }

    // Add timestamp
    booking.createdAt = new Date();

    // Insert into MongoDB
    const result = await db.collection("dog_bookings").insertOne(booking);
    console.log("✅ Booking saved to database with ID:", result.insertedId);

    // Send email
    await sendBookingEmail(booking);

    res.status(201).json({
      success: true,
      message: "Booking submitted and email sent successfully!",
      bookingId: result.insertedId,
    });
  } catch (err) {
    console.error("❌ Booking/Email error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      error: err.message
    });
  }
});


// --- Start Server ---
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});