"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { motion, Variants, easeOut } from "framer-motion";

const Hero = () => {
  const { openTrialBooking } = useBooking();

  // Variants for stagger animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

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


  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative bg-white pt-12 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden bg-cover bg-center bg-no-repeat lg:min-h-screen"
      style={{ backgroundImage: `url("/Ellipse 25.png")` }}
    >


      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-0">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-40"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Content */}
          <motion.div variants={heroVariants} className="z-10 relative">
            {/* Heading */}
            <div className="w-full max-w-[400px]">
              <h1 className="flex flex-col text-left tracking-[0.06em]">
                <motion.span 
                  variants={heroVariants}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-[5xl] font-light text-[#F3C313] text-blur-shadow inline-block"
                >
                  PLATYPUS
                </motion.span>

                <motion.span 
                  variants={heroVariants}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                >
                  INDIA'S DOG
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
              <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#397CEF] leading-tight">
                Mumbai's #1 Certified Dog Walking Service with Live GPS Tracking
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
                onClick={openTrialBooking}
                size="lg"
                className="text-[16px] sm:text-[18px] md:text-[20px] text-white px-8 md:px-10 h-[48px] md:h-[55px] w-full sm:w-[200px] md:w-[213px] py-3 md:py-4 font-medium rounded-[4px]
                bg-blue-500 hover:bg-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Trial Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-[#397CEF] hover:bg-blue-50 px-6 md:px-8 h-[48px] md:h-[55px] 
           w-full sm:w-[240px] md:w-[257px] rounded-[4px] py-3 md:py-4 
           text-sm flex items-center gap-3 shadow-md hover:shadow-lg 
           transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-full justify-center">
                  <img src="/Live.png" alt="Live tracking indicator" loading="lazy" decoding="async" className="w-4 md:w-5 h-4 md:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs md:text-sm text-[#000000]">Live Now</div>
                  <div className="text-[11px] md:text-[13.89px] font-medium text-[#6ACB5D]">Walking in your area</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image - Optimized for LCP */}
          <div className="lg:flex justify-end items-center hidden">
            <div className="relative">
              <picture>
                {/* AVIF - Modern format, best compression */}
                <source
                  type="image/avif"
                  srcSet="/optimized/hero-image-small.avif 400w, /optimized/hero-image-medium.avif 800w, /optimized/hero-image.avif 853w"
                  sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 502px"
                />
                {/* WebP - Wide browser support, good compression */}
                <source
                  type="image/webp"
                  srcSet="/optimized/hero-image-small.webp 400w, /optimized/hero-image-medium.webp 800w, /optimized/hero-image.webp 853w"
                  sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 502px"
                />
                {/* PNG fallback - Original format */}
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
