'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/contexts/BookingContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { useState } from "react";
import FirebaseRecaptcha from "@/components/FirebaseRecaptcha";

// Dynamically import TrialBookingDialog - reCAPTCHA loaded globally
const TrialBookingDialogWithReCaptcha = dynamic(
  () => import("@/components/booking/TrialBookingDialogWrapper"),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingProvider>
          <Toaster />
          <Sonner />
          {/* Global Firebase reCAPTCHA - loads badge on page mount */}
          <FirebaseRecaptcha />
          {children}
          <TrialBookingDialogWithReCaptcha />
        </BookingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
