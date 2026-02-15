'use client';

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/ui/StaggerContainer";
import { motion } from "framer-motion";

const AreasWeServe = () => {
  const { openTrialBooking } = useBooking();

  // Convert locations object to array with slug for routing
  const locationsList = Object.values(locations).map((loc) => ({
    name: loc.name,
    slug: loc.slug,
  }));

  return (
    <section id="areas" className="relative py-24 bg-white overflow-hidden">
      {/* Dot grid decoration */}
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-dots opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Decorative circle */}
      <div className="absolute top-20 right-[-50px] w-[120px] h-[120px] rounded-full border border-brand-blue/10 pointer-events-none" aria-hidden="true" />

      {/* Background paw design - hidden on small screens */}
      <div
        className="hidden md:block absolute top-[-1rem] right-0 w-[200px] h-[240px] lg:top-[-2rem] lg:right-0 lg:w-[350px] lg:h-[400px] pointer-events-none"
        style={{
          backgroundImage: "url('/paw.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="mb-16">
            <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">across Mumbai</span>
            <h2 className="font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight capitalize mb-6">
              <span className="relative">
                Areas
                <span className="absolute bottom-[-10px] left-0 w-full max-w-[220px] h-0 border-b border-golden opacity-100"></span>
              </span>{" "}
              <span className="text-[#FF5B00]">We Serve</span>
            </h2>

            {/* Paragraph and Button in flex container */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6 ">
              <p className="font-normal text-[18px] leading-[28px] text-black mt-4 max-w-4xl capitalize">
                Our pet walking service in Mumbai covers major localities across
                the city. Book trained dog walkers in Bandra, Andheri, Powai,
                Colaba, Juhu, Worli, Chembur, Malad and more updates and manage
                everything from one place.
              </p>

              <Button
                onClick={openTrialBooking}
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 text-lg font-medium hidden md:flex rounded hover:shadow-xl transition-all duration-300 hover:scale-105 items-center justify-center"
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.03} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {locationsList.map((location, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Link
                href={`/dog-walking/${location.slug}`}
                className="group flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3
                           bg-[#F0F6FF] border border-brand-blue/15 hover:bg-brand-blue hover:text-white hover:border-brand-blue rounded-lg text-gray-700
                           transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-brand
                           hover:scale-105"
              >
                <MapPin className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                <span className="font-segoe text-[15px] leading-[22px] font-medium text-center group-hover:text-white transition-colors">
                  {location.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Mobile Book Now Button */}
        <div className="mt-12 md:hidden text-center">
          <Button
            onClick={openTrialBooking}
            size="lg"
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded shadow-lg hover:shadow-xl transition-all duration-300"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasWeServe;
