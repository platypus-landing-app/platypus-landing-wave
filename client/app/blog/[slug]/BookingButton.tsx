'use client';

import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';

export default function BookingButton() {
  const { openTrialBooking } = useBooking();

  return (
    <Button
      onClick={openTrialBooking}
      size="lg"
      className="bg-[#FFE135] text-gray-900 hover:bg-[#E6CA2F] font-bold px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
    >
      Book Trial Now - ₹199
    </Button>
  );
}
