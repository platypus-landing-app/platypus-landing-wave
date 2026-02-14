'use client';

import { Button } from '@/components/ui/button';
import { useApplication } from '@/contexts/ApplicationContext';

export default function JoinApplicationCTA() {
  const { openApplication } = useApplication();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0088FF] via-[#0077EE] to-[#0066DD] p-10 md:p-14 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto">
              Apply in under 5 minutes. We review every application within 48 hours.
            </p>
            <Button
              onClick={openApplication}
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-bold px-8 py-6 text-lg"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
