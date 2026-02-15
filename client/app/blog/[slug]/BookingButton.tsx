'use client';

import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';

export default function BookingButton() {
  const { openTrialBooking } = useBooking();

  return (
    <Button
      onClick={openTrialBooking}
      size="lg"
      className="bg-[#FFE135] text-gray-900 hover:bg-[#E6CA2F] font-bold px-10 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >
      BOOK TRIAL NOW - ₹199
    </Button>
  );
}
