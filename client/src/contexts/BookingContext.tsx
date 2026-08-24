'use client';

import React, { createContext, useContext, useState } from 'react';

interface BookingContextType {
  isTrialBookingOpen: boolean;
  setIsTrialBookingOpen: (open: boolean) => void;
  openTrialBooking: () => void;
  closeTrialBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTrialBookingOpen, setIsTrialBookingOpen] = useState(false);

  // Bookings are paused. Route every "book a trial" CTA to an interest capture
  // on WhatsApp instead of opening the booking dialog, so no new booking can be
  // started from any entry point. (Restore `setIsTrialBookingOpen(true)` to
  // re-enable bookings.)
  const openTrialBooking = () => {
    if (typeof window !== 'undefined') {
      window.open(
        `https://wa.me/918451880963?text=${encodeURIComponent(
          "Hi Platypus! I'd like to register my interest in dog walking for my dog."
        )}`,
        '_blank'
      );
    }
  };
  const closeTrialBooking = () => setIsTrialBookingOpen(false);

  return (
    <BookingContext.Provider
      value={{
        isTrialBookingOpen,
        setIsTrialBookingOpen,
        openTrialBooking,
        closeTrialBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};