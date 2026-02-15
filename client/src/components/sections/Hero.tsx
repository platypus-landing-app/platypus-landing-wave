'use client';

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { trackCTAClick } from "@/lib/analytics";
import { motion, Variants, easeOut } from "framer-motion";

const Hero = () => {
  const { openTrialBooking } = useBooking();

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-[#F0F6FF] via-white to-white pt-12 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden bg-cover bg-center bg-no-repeat lg:min-h-screen"
      style={{ backgroundImage: `url("/Ellipse 25.png")` }}
    >
      {/* Dot grid pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />

      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 left-[-100px] w-[400px] h-[400px] rounded-full bg-[#247AFD]/8 blur-[100px] pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-[-80px] w-[350px] h-[350px] rounded-full bg-[#FFE135]/12 blur-[100px] pointer-events-none"
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 15, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            {/* Social proof badge */}
            <motion.div
              variants={heroVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-blue/10 shadow-sm mb-4"
            >
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FFE135] fill-[#FFE135]" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">4.9 rated</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-medium text-gray-700">500+ happy families</span>
            </motion.div>

            {/* Guttery tagline */}
            <motion.span
              variants={heroVariants}
              className="font-guttery text-[#247AFD] text-lg sm:text-xl md:text-2xl block mb-2"
            >
              be their human
            </motion.span>

            {/* Heading */}
            <div className="w-full max-w-[400px]">
              <h1 className="font-funnel flex flex-col text-left tracking-[0.06em]">
                <motion.span
                  variants={heroVariants}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-[5xl] font-light text-[#FFE135] text-blur-shadow inline-block"
                >
                  PLATYPUS
                </motion.span>

                <motion.span
                  variants={heroVariants}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                >
                  INDIA&apos;S DOG
                </motion.span>

                <motion.span
                  variants={heroVariants}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                >
                  WALKING&nbsp;EXPERTS
                </motion.span>
              </h1>
            </div>

            {/* SEO H2 Subheading */}
            <motion.div
              variants={heroVariants}
              className="mt-4 md:mt-6"
            >
              <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#247AFD] leading-tight">
                Mumbai&apos;s #1 Certified Dog Walking Service with Live GPS Tracking
              </h2>
            </motion.div>

            {/* Paragraph */}
            <motion.div
              variants={heroVariants}
              className="mt-6 md:mt-8 lg:mt-10 w-full sm:w-[90%] md:w-[500px] lg:w-[638px] xl:w-[670px]"
            >
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[22px] text-[#1A1A1A] font-normal font-segoe leading-[160%] sm:leading-[170%] md:leading-[180%] lg:leading-[180%] xl:leading-[130%]">
                Book a Trial Walk Today: Safe, Joyful, Professionally Trained
                Walkers. Live GPS tracking and verified Guardians across Mumbai.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6 lg:pt-0 mt-8 md:mt-10 lg:mt-12"
            >
              <Button
                onClick={() => { trackCTAClick('hero_book_trial'); openTrialBooking(); }}
                size="lg"
                className="text-[16px] sm:text-[18px] md:text-[20px] text-white px-8 md:px-10 h-[48px] md:h-[55px] w-full sm:w-[200px] md:w-[213px] py-3 md:py-4 font-medium rounded-[4px]
                bg-[#247AFD] hover:bg-[#1A5BC4] hover:shadow-[0_0_20px_rgba(36,122,253,0.3)] transition-all duration-300 hover:scale-105"
              >
                Book Trial Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-[#247AFD] hover:bg-blue-50 px-6 md:px-8 h-[48px] md:h-[55px]
           w-full sm:w-[240px] md:w-[257px] rounded-[4px] py-3 md:py-4
           text-sm flex items-center gap-3 shadow-md hover:shadow-lg
           transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#247AFD] to-[#5A9AFE] flex items-center rounded-full justify-center">
                  <img src="/Live.png" alt="Live tracking indicator" loading="lazy" decoding="async" className="w-4 md:w-5 h-4 md:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs md:text-sm text-[#000000]">Live Now</div>
                  <div className="text-[11px] md:text-[13.89px] font-medium text-[#2D6A1F]">Walking in your area</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image - Desktop */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative animate-float">
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
                  className="h-[525px] w-[502px] object-contain rounded-3xl"
                />
              </picture>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10"
              ></motion.div>
            </div>
          </div>

          {/* Mobile Hero Image */}
          <motion.div
            variants={heroVariants}
            className="lg:hidden flex justify-center mt-4"
          >
            <div className="relative">
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
                  className="h-[280px] sm:h-[340px] w-auto object-contain rounded-2xl"
                />
              </picture>
              <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-2xl -z-10 opacity-30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
