'use client';

import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { trackCTAClick } from "@/lib/analytics";
import { motion, Variants, easeOut } from "framer-motion";

/**
 * Direction D Hero — bone scaffold, editorial headline, one yellow accent.
 * Single-statement present-tense positioning: concierge, not marketplace.
 * Photo rendered inside a bone-ring frame on pure-white card over bone canvas
 * (two-tone surface discipline — see CLAUDE.md anti-pattern).
 */
const Hero = () => {
  const { openTrialBooking } = useBooking();

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-brand-bone pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-20 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 md:gap-14 lg:gap-20"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left editorial column */}
          <motion.div variants={heroVariants} className="relative">
            {/* Eyebrow — mono, uppercase, small */}
            <motion.div
              variants={heroVariants}
              className="mb-7 flex items-center gap-3"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-slate font-semibold">
                Mumbai · Thakur Village · Powai
              </span>
            </motion.div>

            {/* Editorial hero — Domine, one single statement, 3–6x contrast with body */}
            <motion.h1
              variants={heroVariants}
              className="font-domine font-medium text-brand-ink
                text-[44px] xs:text-[52px] sm:text-[60px] md:text-[68px] lg:text-[76px]
                leading-[1.03] tracking-[-0.03em] mb-7"
            >
              A quiet, careful walk
              <br />
              for your dog
              <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow ml-1 align-top mt-4" />
            </motion.h1>

            {/* Body — two generous columns max, restrained */}
            <motion.p
              variants={heroVariants}
              className="max-w-[540px] text-[16px] md:text-[17px] leading-[1.65] text-brand-graphite font-normal mb-10"
            >
              Platypus is a concierge for your dog&apos;s daily walk — a small, trained guardian team in your
              neighbourhood, a quiet ritual, and a live GPS trail so you can watch from anywhere.
            </motion.p>

            {/* CTA row — one primary ink button + one ghost link */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8"
            >
              <Button
                onClick={() => { trackCTAClick('hero_book_trial'); openTrialBooking(); }}
                size="lg"
                className="bg-brand-ink text-brand-bone hover:bg-brand-graphite
                  h-[56px] px-8 rounded-xl text-[15px] font-semibold tracking-[-0.005em]
                  shadow-none transition-all"
              >
                Book a trial walk
                <span className="ml-2 text-brand-yellow">→</span>
              </Button>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-[56px] px-2 text-[14px] font-medium text-brand-graphite hover:text-brand-ink transition-colors"
              >
                How it works
                <span className="text-brand-muted">→</span>
              </a>
            </motion.div>

            {/* Data row — mono typography, rule divider, editorial register */}
            <motion.div
              variants={heroVariants}
              className="border-t border-brand-rule pt-5 flex flex-wrap gap-x-8 gap-y-3 text-[12px]"
            >
              <div>
                <div className="font-mono text-brand-ink font-medium">5,000+</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-brand-slate font-semibold mt-0.5">Walks delivered</div>
              </div>
              <div>
                <div className="font-mono text-brand-ink font-medium">4.9 / 5.0</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-brand-slate font-semibold mt-0.5">Parent rating</div>
              </div>
              <div>
                <div className="font-mono text-brand-ink font-medium">21 hubs</div>
                <div className="text-[11px] tracking-[0.1em] uppercase text-brand-slate font-semibold mt-0.5">Across Mumbai</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — hero photo framed in bone-ring on white card */}
          <motion.div
            variants={heroVariants}
            className="relative w-full"
          >
            {/* Bone ring frame over white card — Direction D "bone ring on ink surface" adapted for light scaffold */}
            <div className="relative bg-white rounded-[28px] p-3 md:p-4 border border-brand-rule shadow-[0_1px_2px_rgba(11,11,11,0.04)]">
              <div className="relative rounded-[20px] overflow-hidden bg-brand-cream aspect-[4/5] md:aspect-[5/6]">
                <img
                  src="/images/hero/walk-thakurvillage-hero.jpg"
                  alt="A Platypus guardian walking a dog in a Thakur Village lane, Mumbai."
                  width={640}
                  height={800}
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Floating editorial caption card — inset bottom-left */}
              <div className="absolute left-5 bottom-5 md:left-6 md:bottom-6 bg-brand-ink text-brand-bone rounded-xl px-4 py-3 max-w-[240px]">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand-yellow font-semibold mb-1.5">
                  Live · 5:58 PM
                </div>
                <div className="font-domine text-[14px] leading-[1.3] font-medium">
                  Leo is on his evening walk with Sagar.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
