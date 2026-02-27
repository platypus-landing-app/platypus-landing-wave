'use client';

import { Star } from 'lucide-react';
import { motion, Variants, easeOut } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { LocationData } from '@/data/locations';

interface LocationHeroProps {
  locationInfo: LocationData;
  location: string;
}

export default function LocationHero({ locationInfo, location }: LocationHeroProps) {
  const { openTrialBooking } = useBooking();

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-[#FFFBF0] pt-12 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden lg:min-h-screen"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-0 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-16"
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

            {/* Tagline */}
            <motion.span
              variants={heroVariants}
              className="font-guttery text-brand-blue text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] block mb-4 ml-[-1px]"
            >
              be their human
            </motion.span>

            {/* Heading — serif, sentence case */}
            <div className="w-full max-w-[500px]">
              <h1 className="font-domine font-bold text-gray-900 text-[32px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.15]">
                Dog Walking in {locationInfo.name}
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

            {/* SEO H2 Subheading */}
            <motion.div variants={heroVariants} className="mt-4 md:mt-5">
              <h2 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium text-gray-600 leading-snug">
                Certified Guardians with live GPS tracking in {locationInfo.displayName}
              </h2>
            </motion.div>

            {/* Body copy */}
            <motion.div
              variants={heroVariants}
              className="mt-5 md:mt-6 w-full sm:w-[90%] md:w-[500px] lg:w-[580px]"
            >
              <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-700 font-funnel leading-[1.7]">
                India&apos;s first certified dog walking service in {locationInfo.name}. Our trained
                Guardians provide safe, reliable walks with live GPS tracking, safety protocols,
                and professional care for your dog in {locationInfo.displayName}.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 mt-8 md:mt-10"
            >
              <Button
                onClick={openTrialBooking}
                size="lg"
                className="text-[16px] sm:text-[17px] md:text-[18px] text-white px-8 md:px-10 h-[48px] md:h-[52px] w-full sm:w-auto py-3 font-medium rounded-full
                  bg-brand-blue hover:bg-brand-blue-dark hover:shadow-brand transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Trial Now
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
                  <div className="text-[11px] md:text-[13px] font-medium text-brand-green">Walking in {locationInfo.name}</div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Location Details */}
          <motion.div
            variants={heroVariants}
            className="lg:flex justify-end items-center hidden"
          >
            <div className="relative">
              {/* Location-specific details card */}
              <div className="bg-white rounded-3xl shadow-brand-lg p-8 max-w-[500px] border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
                  We Serve {locationInfo.name}
                </h3>

                {/* Neighborhoods */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-left text-sm uppercase tracking-wide">
                    Areas We Cover:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {locationInfo.neighborhoods.map((neighborhood, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-[#247AFD] text-lg">✓</span>
                        <span className="text-gray-700 text-sm">{neighborhood}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Landmarks */}
                <div className="bg-[#FFF8E7] rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-left text-sm">
                    Popular Walking Routes Near:
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed text-left">
                    {locationInfo.landmarks.join(' • ')}
                  </p>
                </div>

                {/* Trial price badge */}
                <div className="mt-6 bg-[#FFE135] rounded-xl p-4 text-center">
                  <p className="text-black text-sm font-medium mb-1">Trial Walk Starting At</p>
                  <p className="text-black text-3xl font-bold">₹199</p>
                </div>
              </div>

              {/* Decorative gradient background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/10 rounded-3xl -z-10"
              ></motion.div>
            </div>
          </motion.div>

          {/* Mobile version of location details */}
          <motion.div
            variants={heroVariants}
            className="lg:hidden"
          >
            <div className="bg-[#FFF8E7] rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-left">
                We Serve {locationInfo.name} Areas Including:
              </h3>
              <div className="grid grid-cols-2 gap-4 text-left mb-4">
                {locationInfo.neighborhoods.map((neighborhood, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-blue-600">✓</span>
                    <span className="text-gray-700 text-sm">{neighborhood}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-left text-sm">
                  Popular Walking Routes Near:
                </h4>
                <p className="text-gray-700 text-sm text-left">
                  {locationInfo.landmarks.join(' • ')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
