'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { LocationData } from '@/data/locations';

interface LocationHeroProps {
  locationInfo: LocationData;
  location: string;
}

export default function LocationHero({ locationInfo, location }: LocationHeroProps) {
  const { openTrialBooking } = useBooking();

  return (
    <section
      id="home"
      className="relative bg-white pt-12 sm:pt-12 md:pt-16 lg:pt-20 overflow-hidden bg-cover bg-center bg-no-repeat lg:min-h-screen"
      style={{ backgroundImage: `url("/Ellipse 25.png")` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-0">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-40"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {/* Left Content */}
          <motion.div
            className="z-10 relative"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
              },
            }}
          >
            {/* Heading */}
            <div className="w-full max-w-[400px]">
              <h1 className="flex flex-col text-left tracking-[0.06em]">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: 'easeOut' },
                    },
                  }}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-[5xl] font-light text-[#FFE135] text-blur-shadow inline-block"
                >
                  PLATYPUS
                </motion.span>

                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: 'easeOut' },
                    },
                  }}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                >
                  {locationInfo.name.toUpperCase()}
                </motion.span>

                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: 'easeOut' },
                    },
                  }}
                  className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[55px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                >
                  DOG WALKING
                </motion.span>
              </h1>
            </div>

            {/* SEO H2 Subheading */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="mt-4 md:mt-6"
            >
              <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#247AFD] leading-tight text-left">
                Certified Guardians with Live GPS Tracking in {locationInfo.displayName}
              </h2>
            </motion.div>

            {/* Paragraph */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="mt-6 md:mt-8 lg:mt-10 w-full sm:w-[90%] md:w-[500px] lg:w-[638px] xl:w-[670px]"
            >
              <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[22px] text-[#1A1A1A] font-normal font-segoe leading-[160%] sm:leading-[170%] md:leading-[180%] lg:leading-[180%] xl:leading-[130%] text-left">
                India's first certified dog walking service in {locationInfo.name}. Our trained
                Guardians provide safe, reliable walks with live GPS tracking, safety protocols,
                and professional care for your dog in {locationInfo.displayName}.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
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
                className="text-[#247AFD] hover:bg-blue-50 px-6 md:px-8 h-[48px] md:h-[55px]
                  w-full sm:w-[240px] md:w-[257px] rounded-[4px] py-3 md:py-4
                  text-sm flex items-center gap-3 shadow-md hover:shadow-lg
                  transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#247AFD] to-[#5A9AFE] flex items-center rounded-full justify-center">
                  <img
                    src="/Live.png"
                    className="w-4 md:w-5 h-4 md:h-5 text-white"
                    alt="Live"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs md:text-sm text-[#000000]">
                    Live Now
                  </div>
                  <div className="text-[11px] md:text-[13.89px] font-medium text-[#6ACB5D]">
                    Walking in {locationInfo.name}
                  </div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Location Details */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
              },
            }}
            className="lg:flex justify-end items-center hidden"
          >
            <div className="relative">
              {/* Location-specific details card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-[500px] border border-gray-100">
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
                <div className="bg-blue-50 rounded-xl p-4">
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
                className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10"
              ></motion.div>
            </div>
          </motion.div>

          {/* Mobile version of location details */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
              },
            }}
            className="lg:hidden"
          >
            <div className="bg-blue-50 rounded-lg p-6 mt-8">
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
