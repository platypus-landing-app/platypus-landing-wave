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
        ease: easeOut, // ✅ correct
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
      className="relative bg-white pt-8 sm:pt-10 md:pt-12 lg:pt-16 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("/Ellipse 25.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        height: "109vh", // Mobile: 100vh, matches original
        minHeight: "600px", // Perfect height as requested
      }}
    >
     <style>{`
        @media (max-width: 1024px) {
          #home {
            height: 0vh !important;
          }
        }
      `}</style>


      {/* Background Circles */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute top-[-365px] left-[-300px] w-[800px] h-[800px] bg-[#FFF8E0BD] rounded-full z-0 opacity-90"></div>
        {/* <div className="absolute top-[400px] left-[1200px] w-[800px] h-[800px] bg-[#E7F0FFAD] rounded-full z-0 opacity-90"></div> */}
      </motion.div>

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center w-full gap-8 md:gap-12 lg:gap-40 py-4 md:py-8 lg:py-12"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Content */}
          <motion.div variants={heroVariants} className="z-10 relative">
            {/* Heading */}
<div className="w-full max-w-[400px]">
  <h1 className="flex flex-col text-left tracking-[0.06em] mt-8 md:mt-[100px] lg:mt-0">
<motion.span
  variants={heroVariants}
  className="text-[36px] xs:text-[42px] sm:text-[46px] md:text-[50px] lg:text-[36px] xl:text-[42px] font-light text-[#F3C313] text-blur-shadow inline-block"
>
  PLATYPUS
</motion.span>

<motion.span
  variants={heroVariants}
  className="text-[36px] xs:text-[42px] sm:text-[46px] md:text-[50px] lg:text-[38px] xl:text-[42px] font-extrabold text-black text-blur-shadow inline-block mt-0 sm:mt-2"
>
  INDIA'S DOG
</motion.span>

<motion.span
  variants={heroVariants}
  className="text-[36px] xs:text-[42px] sm:text-[46px] md:text-[50px] lg:text-[38px] xl:text-[42px] font-extrabold text-black text-blur-shadow inline-block mt-0 sm:mt-2"
>
  WALKING&nbsp;EXPERTS
</motion.span>


              </h1>
            </div>

            {/* Paragraph */}
            <motion.div
              variants={heroVariants}
              className="mt-6 md:mt-8 lg:mt-10 w-full sm:w-[90%] md:w-[500px] lg:w-[638px] xl:w-[670px]"
            >
<p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px] xl:text-[15px] text-[#1A1A1A] font-normal font-segoe leading-[160%] sm:leading-[170%] md:leading-[180%] lg:leading-[170%] xl:leading-[175%]">
  Book a Trial Walk Today: Safe, Joyful, Professionally Trained
  Walkers. Live GPS tracking and verified Guardians across Mumbai.
</p>

            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 md:pt-8 mt-8 md:mt-10 sm:mb-[50px]"
            >
<Button
  onClick={openTrialBooking}
  size="lg"
  className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[16px] xl:text-[18px] 
             text-white px-8 md:px-10 lg:px-6 xl:px-8 
             h-[48px] md:h-[55px] lg:h-[45px] xl:h-[48px] 
             w-full sm:w-[200px] md:w-[213px] lg:w-[180px] xl:w-[190px]
             py-3 md:py-4 font-medium rounded-[4px]
             bg-blue-500 hover:bg-blue-400 hover:shadow-xl 
             transition-all duration-300 hover:scale-105"
>
  Book Trial Now
</Button>

<Button
  variant="outline"
  size="lg"
  className="text-[#397CEF] hover:bg-blue-50 
             text-sm sm:text-base md:text-lg lg:text-sm xl:text-base
             px-6 md:px-8 lg:px-5 xl:px-6
             h-[48px] md:h-[55px] lg:h-[45px] xl:h-[48px]
             w-full sm:w-[240px] md:w-[257px] lg:w-[200px] xl:w-[220px]
             rounded-[4px] py-3 md:py-4 
             flex items-center gap-3 shadow-md hover:shadow-lg 
             transition-all duration-300 hover:scale-105"
>
  <div className="w-8 md:w-10 lg:w-8 xl:w-9 h-8 md:h-10 lg:h-8 xl:h-9 bg-gradient-to-b from-[#397CEF] to-[#709DEB] flex items-center rounded-full justify-center">
    <img src="/Live.png" className="w-4 md:w-5 lg:w-4 xl:w-5 h-4 md:h-5 lg:h-4 xl:h-5 text-white" />
  </div>
  <div className="text-left">
    <div className="font-semibold text-xs md:text-sm lg:text-xs xl:text-sm text-[#000000]">
      Live Now
    </div>
    <div className="text-[11px] md:text-[13.89px] lg:text-[11px] xl:text-[12px] font-medium text-[#6ACB5D]">
      Walking in your area
    </div>
  </div>
</Button>

            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={heroVariants}
            className="lg:flex justify-end items-center hidden"
          >
            <div className="relative">
              <img
                src={"/hero Img.png"}
                alt="Professional dog walker with golden retriever"
                className="max-h-[87vh] w-auto object-contain rounded-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;