'use client';

import { useBooking } from "@/contexts/BookingContext";
import dynamic from "next/dynamic";

// Dynamically import TrialBookingDialog with no SSR
const TrialBookingDialog = dynamic(
  () => import("./TrialBookingDialog"),
  { ssr: false }
);

/**
 * Wrapper component for TrialBookingDialog
 * Removed GoogleReCaptchaProvider to prevent conflicts with Firebase Enterprise reCAPTCHA
 */
export default function TrialBookingDialogWrapper() {
  const { isTrialBookingOpen } = useBooking();

  // Only render dialog when open
  if (!isTrialBookingOpen) {
    return null;
  }

  return <TrialBookingDialog />;
}
