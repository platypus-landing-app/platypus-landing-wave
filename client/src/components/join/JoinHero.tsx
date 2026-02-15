'use client';

import { Button } from '@/components/ui/button';
import { useApplication } from '@/contexts/ApplicationContext';
import { trackCTAClick } from '@/lib/analytics';

export default function JoinHero() {
  const { openApplication } = useApplication();

  return (
    <section className="relative bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] text-white py-20 md:py-28 overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise" />
      {/* Dot grid */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-dots opacity-20 pointer-events-none" />
      {/* Decorative circles */}
      <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="font-guttery text-brand-yellow text-lg sm:text-xl mb-2 block">join our team</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Dog Walker Job in Mumbai — Become a Platypus Guardian
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
            Love dogs? Turn your passion into a rewarding career. Join Mumbai&apos;s most trusted pet
            care team as a Walker, Groomer, Trainer, or Sitter. Earn ₹15,000–30,000/month with flexible hours.
          </p>
          <Button
            onClick={() => { trackCTAClick('join_hero_apply'); openApplication(); }}
            size="lg"
            className="bg-[#FFE135] hover:bg-[#E6CA2F] text-gray-900 font-bold px-8 py-6 text-lg hover:shadow-warm hover:scale-105 transition-all duration-300"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}
