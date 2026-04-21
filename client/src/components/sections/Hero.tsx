'use client';

import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { trackCTAClick } from "@/lib/analytics";
import { motion, Variants, easeOut, cubicBezier } from "framer-motion";

/**
 * Direction D Hero — bone scaffold, editorial headline, one yellow accent.
 * Choreographed entry: left column elements stagger top-down, right column
 * photo eases in with a subtle scale, then the caption floats in last.
 */
const Hero = () => {
  const { openTrialBooking } = useBooking();

  const editorial = cubicBezier(0.22, 1, 0.36, 1);

  const columnStagger: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: editorial },
    },
  };

  const headline: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: editorial, delay: 0.05 },
    },
  };

  const yellowDot: Variants = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: easeOut, delay: 0.9 },
    },
  };

  const photo: Variants = {
    hidden: { opacity: 0, scale: 1.04 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: editorial, delay: 0.1 },
    },
  };

  const caption: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: editorial, delay: 1.0 },
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
          variants={columnStagger}
          initial="hidden"
          animate="show"
        >
          {/* Left editorial column — children stagger top-down */}
          <motion.div variants={columnStagger} className="relative">
            {/* Eyebrow — mono, uppercase, small */}
            <motion.div
              variants={line}
              className="mb-7 flex items-center gap-3"
            >
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-brand-yellow"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-slate font-semibold">
                Mumbai · Thakur Village · Powai
              </span>
            </motion.div>

            {/* Editorial hero — Domine, one single statement, 3–6x contrast with body */}
            <motion.h1
              variants={headline}
              className="font-domine font-medium text-brand-ink
                text-[44px] xs:text-[52px] sm:text-[60px] md:text-[68px] lg:text-[76px]
                leading-[1.03] tracking-[-0.03em] mb-7"
            >
              A quiet, careful walk
              <br />
              for your dog
              <motion.span
                variants={yellowDot}
                initial="hidden"
                animate="show"
                className="inline-block w-2 h-2 rounded-full bg-brand-yellow ml-1 align-top mt-4"
              />
            </motion.h1>

            {/* Body — two generous columns max, restrained */}
            <motion.p
              variants={line}
              className="max-w-[540px] text-[16px] md:text-[17px] leading-[1.65] text-brand-graphite font-normal mb-10"
            >
              Platypus is a concierge for your dog&apos;s daily walk — a small, trained guardian team in your
              neighbourhood, a quiet ritual, and a live GPS trail so you can watch from anywhere.
            </motion.p>

            {/* CTA row — one primary ink button + one ghost link */}
            <motion.div
              variants={line}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8"
            >
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }} transition={{ duration: 0.2, ease: editorial }}>
                <Button
                  onClick={() => { trackCTAClick('hero_book_trial'); openTrialBooking(); }}
                  size="lg"
                  className="bg-brand-ink text-brand-bone hover:bg-brand-graphite
                    h-[56px] px-8 rounded-xl text-[15px] font-semibold tracking-[-0.005em]
                    shadow-none transition-all group"
                >
                  Book a trial walk
                  <span className="ml-2 text-brand-yellow transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </motion.div>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-[56px] px-2 text-[14px] font-medium text-brand-graphite hover:text-brand-ink transition-colors group"
              >
                How it works
                <span className="text-brand-muted transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            {/* Data row — stats stagger between themselves */}
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="border-t border-brand-rule pt-5 flex flex-wrap gap-x-8 gap-y-3 text-[12px]"
            >
              {[
                { value: '5,000+', label: 'Walks delivered' },
                { value: '4.9 / 5.0', label: 'Parent rating' },
                { value: '21 hubs', label: 'Across Mumbai' },
              ].map((stat) => (
                <motion.div key={stat.label} variants={line}>
                  <div className="font-mono text-brand-ink font-medium">{stat.value}</div>
                  <div className="text-[11px] tracking-[0.1em] uppercase text-brand-slate font-semibold mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero photo feathered into bone canvas, no frame */}
          <motion.div
            variants={photo}
            className="relative w-full"
          >
            {/* Smudged feather — photo dissolves into bone canvas.
                Aggressive bone radial overlay that starts painting at 25% and
                reaches full bone at the edges. No frame, no border. */}
            <div className="relative aspect-[4/5] md:aspect-[5/6] w-full">
              <img
                src="/images/hero/walk-thakurvillage-hero.jpg"
                alt="A quiet labrador, watching morning light in a Thakur Village home."
                width={1024}
                height={1536}
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Bone vignette — aggressive smudge so edges genuinely disappear
                  into the page canvas. Four layered radial stops, no hard edge. */}
              <div
                className="absolute -inset-px pointer-events-none"
                style={{
                  background: [
                    'radial-gradient(ellipse 65% 72% at 50% 44%, transparent 10%, rgba(251,249,243,0.08) 30%, rgba(251,249,243,0.32) 50%, rgba(251,249,243,0.68) 72%, rgba(251,249,243,0.92) 88%, #FBF9F3 100%)',
                    'linear-gradient(to right, #FBF9F3 0%, rgba(251,249,243,0.5) 8%, transparent 22%, transparent 78%, rgba(251,249,243,0.5) 92%, #FBF9F3 100%)',
                    'linear-gradient(to bottom, #FBF9F3 0%, rgba(251,249,243,0.5) 6%, transparent 18%, transparent 82%, rgba(251,249,243,0.5) 94%, #FBF9F3 100%)',
                  ].join(', '),
                }}
              />
            </div>

            {/* Floating editorial caption — glass on bone, animates in last */}
            <motion.div
              variants={caption}
              initial="hidden"
              animate="show"
              className="absolute left-5 bottom-7 md:left-6 md:bottom-10 bg-brand-ink/95 backdrop-blur-sm text-brand-bone rounded-xl px-4 py-3 max-w-[240px] shadow-[0_2px_18px_rgba(11,11,11,0.08)]"
            >
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand-yellow font-semibold mb-1.5 flex items-center gap-1.5">
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-brand-yellow"
                  animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                Live · 5:58 PM
              </div>
              <div className="font-domine text-[14px] leading-[1.3] font-medium">
                Leo is on his evening walk with Sagar.
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
