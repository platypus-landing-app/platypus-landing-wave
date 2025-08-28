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

  const openTrialBooking = () => setIsTrialBookingOpen(true);
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