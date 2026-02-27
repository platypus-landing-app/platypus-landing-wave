'use client';

import { Button } from '@/components/ui/button';
import { useApplication } from '@/contexts/ApplicationContext';
import { trackCTAClick } from '@/lib/analytics';

export default function JoinHero() {
  const { openApplication } = useApplication();

  return (
    <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">join our team</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">
            Dog Walker Job in Mumbai — Become a Platypus Guardian
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
            Love dogs? Turn your passion into a rewarding career. Join Mumbai&apos;s most trusted pet
            care team as a Walker, Groomer, Trainer, or Sitter. Earn ₹15,000–30,000/month with flexible hours.
          </p>
          <Button
            onClick={() => { trackCTAClick('join_hero_apply'); openApplication(); }}
            size="lg"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-6 text-lg rounded-full hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}
