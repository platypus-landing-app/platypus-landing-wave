'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/contexts/BookingContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { useState } from "react";
import FirebaseRecaptcha from "@/components/FirebaseRecaptcha";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

// Dynamically import TrialBookingDialog - reCAPTCHA loaded globally
const TrialBookingDialogWithReCaptcha = dynamic(
  () => import("@/components/booking/TrialBookingDialogWrapper"),
  { ssr: false }
);

// Dynamically import ProfessionalApplicationDialog
const ProfessionalApplicationDialogWrapper = dynamic(
  () => import("@/components/application/ProfessionalApplicationDialogWrapper"),
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
          <ApplicationProvider>
            <Toaster />
            <Sonner />
            {/* Global Firebase reCAPTCHA - loads badge on page mount */}
            <FirebaseRecaptcha />
            {children}
            <TrialBookingDialogWithReCaptcha />
            <ProfessionalApplicationDialogWrapper />
            <ScrollProgress />
            <BackToTop />
            <WhatsAppButton />
          </ApplicationProvider>
        </BookingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
