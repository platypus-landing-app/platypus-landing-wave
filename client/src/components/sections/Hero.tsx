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
          itemScope
          itemType="https://schema.org/Service"
      >
        {/* Hidden structured data for SEO */}
        <div style={{ display: 'none' }}>
          <span itemProp="name">Professional Dog Walking Service Mumbai</span>
          <span itemProp="description">India's first certified dog walking service with live GPS tracking and trained Guardians across Mumbai</span>
          <span itemProp="provider" itemScope itemType="https://schema.org/LocalBusiness">
          <span itemProp="name">Platypus</span>
          <span itemProp="telephone">+918451880963</span>
          <span itemProp="email">info@theplatypus.in</span>
        </span>
          <span itemProp="areaServed">Mumbai, Maharashtra, India</span>
          <span itemProp="serviceType">Pet Care</span>
          <span itemProp="category">Dog Walking</span>
        </div>

        {/* Background Circles */}
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            aria-hidden="true"
        >
          <div className="absolute top-[-173px] left-[-231px] w-[607px] h-[607px] bg-[#FFF8E0BD] rounded-full z-0 opacity-90"></div>
          <div className="absolute top-[233px] left-[1540px] w-[607px] h-[607px] bg-[#E7F0FFAD] rounded-full z-0 opacity-90"></div>
        </motion.div>

        {/* Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] gap-8 md:gap-12 lg:gap-40"
              variants={heroVariants}
              initial="hidden"
              animate="show"
          >
            {/* Left Content */}
            <motion.div variants={heroVariants} className="z-10 relative">
              {/* Main Heading with proper SEO structure */}
              <header className="w-full max-w-[400px]">
                <h1 className="flex flex-col text-left tracking-[0.06em]">
                  <motion.span
                      variants={heroVariants}
                      className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-[6xl] font-light text-[#F3C313] text-blur-shadow inline-block"
                  >
                    PLATYPUS
                  </motion.span>

                  <motion.span
                      variants={heroVariants}
                      className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                  >
                    INDIA'S DOG
                  </motion.span>

                  <motion.span
                      variants={heroVariants}
                      className="text-[36px] xs:text-[42px] sm:text-[52px] md:text-[56px] lg:text-6xl font-extrabold text-black text-blur-shadow inline-block mt-2"
                  >
                    WALKING EXPERTS
                  </motion.span>
                </h1>
              </header>

              {/* Subtitle with key SEO keywords */}
              <motion.div
                  variants={heroVariants}
                  className="mt-6 md:mt-8 lg:mt-10 w-full sm:w-[90%] md:w-[500px] lg:w-[638px] xl:w-[670px]"
              >
                <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[22px] text-[#1A1A1A] font-normal font-segoe leading-[160%] sm:leading-[170%] md:leading-[180%] lg:leading-[180%] xl:leading-[180%]">
                  Book a <strong>Trial Walk Today</strong>: Safe, Joyful, <strong>Professionally Trained Walkers</strong> in <strong>Mumbai</strong>.
                  <strong>Live GPS tracking</strong> and <strong>verified Guardians</strong> across <strong>Bandra, Andheri, Powai</strong> and more areas.
                </p>
              </motion.div>

              {/* Call-to-Action Buttons */}
              <motion.div
                  variants={heroVariants}
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6 lg:pt-8 mt-8 md:mt-10 lg:mt-12"
              >
                <Button
                    onClick={openTrialBooking}
                    size="lg"
                    className="text-[16px] sm:text-[18px] md:text-[20px] text-white px-8 md:px-10 h-[48px] md:h-[55px] w-full sm:w-[200px] md:w-[213px] py-3 md:py-4 font-medium rounded-[4px]
                bg-blue-500 hover:bg-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    aria-label="Book professional dog walking trial in Mumbai"
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
                    aria-label="View live dog walking activity in your area"
                >
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-full justify-center">
                    <img
                        src="/Live.png"
                        className="w-4 md:w-5 h-4 md:h-5 text-white"
                        alt="Live tracking icon"
                        loading="lazy"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-xs md:text-sm text-[#000000]">Live Now</div>
                    <div className="text-[11px] md:text-[13.89px] font-medium text-[#6ACB5D]">Walking in your area</div>
                  </div>
                </Button>
              </motion.div>

              {/* Trust indicators for SEO */}
              <motion.div
                  variants={heroVariants}
                  className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600"
              >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>50+ Dogs Walked Daily</strong>
              </span>
                <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>99% Customer Renewal</strong>
              </span>
                <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <strong>Certified Guardians</strong>
              </span>
              </motion.div>
            </motion.div>

            {/* Right Image with proper alt text */}
            <motion.div
                variants={heroVariants}
                className="lg:flex justify-end items-center hidden"
            >
              <div className="relative">
                <img
                    src={"/hero Img.png"}
                    alt="Professional certified dog walker from Platypus with golden retriever in Mumbai, showing safe and joyful pet care service"
                    className="h-[752px] w-[502px] object-contain rounded-3xl"
                    loading="eager"
                    width="502"
                    height="752"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10"
                    aria-hidden="true"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
};

export default Hero;