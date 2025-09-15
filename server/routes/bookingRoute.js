// routes/bookingRoutes.js
import express from "express";
import { createBooking } from "../controllers/bookingController";

const router = express.Router();

router.post("/send-booking-email", createBooking);

export default router;
