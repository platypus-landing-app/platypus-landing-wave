'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookingProvider } from "@/contexts/BookingContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import TrialBookingDialog with no SSR to avoid Google Maps SSR issues
const TrialBookingDialog = dynamic(
  () => import("@/components/booking/TrialBookingDialog"),
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
          {children}
          <TrialBookingDialog />
        </BookingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
