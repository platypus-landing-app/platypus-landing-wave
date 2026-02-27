'use client';

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { trackCTAClick } from "@/lib/analytics";
import { motion, Variants, easeOut } from "framer-motion";

const Hero = () => {
  const { openTrialBooking } = useBooking();

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-[#FFFBF0] pt-12 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden lg:min-h-screen"
    >
      {/* Subtle warm radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 225, 53, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-0 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-40"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Content */}
          <motion.div variants={heroVariants} className="z-10 relative">
            {/* Brand wordmark */}
            <motion.div variants={heroVariants} className="mb-1 ml-[-2px]">
              <img
                src="/platypus-wordmark.svg"
                alt="Platypus"
                className="h-[32px] sm:h-[36px] md:h-[40px] lg:h-[44px] w-auto"
              />
            </motion.div>

            {/* Tagline — Guttery script, paired with wordmark */}
            <motion.span
              variants={heroVariants}
              className="font-guttery text-brand-blue text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] block mb-4 ml-[-1px]"
            >
              be their human
            </motion.span>

            {/* Heading — serif, sentence case */}
            <div className="w-full max-w-[500px]">
              <h1 className="font-domine font-bold text-gray-900 text-[32px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.15]">
                India&apos;s Dog Walking Experts
              </h1>
            </div>

            {/* Social proof badge */}
            <motion.div
              variants={heroVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-yellow/20 shadow-sm mt-5 md:mt-6"
            >
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">4.9 rated</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-gray-700">500+ happy families</span>
            </motion.div>

            {/* SEO H2 Subheading — supportive, not competing */}
            <motion.div
              variants={heroVariants}
              className="mt-4 md:mt-5"
            >
              <h2 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium text-gray-600 leading-snug">
                Mumbai&apos;s certified dog walking service with live GPS tracking
              </h2>
            </motion.div>

            {/* Body copy */}
            <motion.div
              variants={heroVariants}
              className="mt-5 md:mt-6 w-full sm:w-[90%] md:w-[500px] lg:w-[580px]"
            >
              <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-700 font-funnel leading-[1.7]">
                Safe, joyful, professionally trained walkers. Live GPS tracking
                and verified Guardians across Mumbai.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 mt-8 md:mt-10"
            >
              <Button
                onClick={() => { trackCTAClick('hero_book_trial'); openTrialBooking(); }}
                size="lg"
                className="text-[16px] sm:text-[17px] md:text-[18px] text-white px-8 md:px-10 h-[48px] md:h-[52px] w-full sm:w-auto py-3 font-medium rounded-full
                bg-brand-blue hover:bg-brand-blue-dark hover:shadow-brand transition-all duration-300 hover:-translate-y-0.5"
              >
                Book a Free Trial
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-gray-800 hover:bg-white/60 px-6 md:px-8 h-[48px] md:h-[52px]
                  w-full sm:w-auto rounded-full py-3
                  text-sm flex items-center gap-3 shadow-sm hover:shadow-md border-gray-200
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-brand-green animate-subtle-pulse-green" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs md:text-sm text-gray-900">Live Now</div>
                  <div className="text-[11px] md:text-[13px] font-medium text-brand-green">Walking in your area</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image - Desktop */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative">
              {/* Organic blob shape behind image */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[110%] h-[95%] bg-brand-yellow/10 -z-10"
                style={{ borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' }}
              />
              <picture>
                <source
                  type="image/avif"
                  srcSet="/optimized/hero-image-small.avif 400w, /optimized/hero-image-medium.avif 800w, /optimized/hero-image.avif 853w"
                  sizes="502px"
                />
                <source
                  type="image/webp"
                  srcSet="/optimized/hero-image-small.webp 400w, /optimized/hero-image-medium.webp 800w, /optimized/hero-image.webp 853w"
                  sizes="502px"
                />
                <img
                  src="/hero-image.png"
                  alt="Professional dog walker with golden retriever"
                  width="502"
                  height="525"
                  fetchPriority="high"
                  className="h-[525px] w-[502px] object-contain"
                />
              </picture>
            </div>
          </div>

          {/* Mobile Hero Image */}
          <motion.div
            variants={heroVariants}
            className="lg:hidden flex justify-center mt-4"
          >
            <div className="relative">
              {/* Organic blob shape behind image */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[110%] h-[95%] bg-brand-yellow/10 -z-10"
                style={{ borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%' }}
              />
              <picture>
                <source
                  type="image/avif"
                  srcSet="/optimized/hero-image-small.avif 400w, /optimized/hero-image-medium.avif 800w"
                  sizes="(max-width: 640px) 280px, 360px"
                />
                <source
                  type="image/webp"
                  srcSet="/optimized/hero-image-small.webp 400w, /optimized/hero-image-medium.webp 800w"
                  sizes="(max-width: 640px) 280px, 360px"
                />
                <img
                  src="/hero-image.png"
                  alt="Professional dog walker with golden retriever"
                  width="360"
                  height="376"
                  fetchPriority="high"
                  className="h-[280px] sm:h-[340px] w-auto object-contain"
                />
              </picture>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
