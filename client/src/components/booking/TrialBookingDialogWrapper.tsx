'use client';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useBooking } from "@/contexts/BookingContext";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import TrialBookingDialog with no SSR
const TrialBookingDialog = dynamic(
  () => import("./TrialBookingDialog"),
  { ssr: false }
);

/**
 * Wrapper component that lazy-loads reCAPTCHA only when booking dialog opens
 * This saves ~811ms execution time and ~737KB transfer on initial page load
 */
export default function TrialBookingDialogWrapper() {
  const { isTrialBookingOpen } = useBooking();
  const [hasLoadedRecaptcha, setHasLoadedRecaptcha] = useState(false);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Load reCAPTCHA only when dialog is opened for the first time
  useEffect(() => {
    if (isTrialBookingOpen && !hasLoadedRecaptcha) {
      setHasLoadedRecaptcha(true);
    }
  }, [isTrialBookingOpen, hasLoadedRecaptcha]);

  // Don't render anything until dialog is opened
  if (!hasLoadedRecaptcha) {
    return null;
  }

  // Once dialog has been opened, wrap it with reCAPTCHA provider
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <TrialBookingDialog />
    </GoogleReCaptchaProvider>
  );
}
