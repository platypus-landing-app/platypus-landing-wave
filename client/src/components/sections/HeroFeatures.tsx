'use client';

import { PawPrint, MapPin, ShieldCheck, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/ui/StaggerContainer";
import { motion } from "framer-motion";

const HeroFeatures = () => {
  const features = [
    { icon: PawPrint, text: "50+ Dogs Walked Daily", color: "bg-brand-blue/10 text-brand-blue" },
    { icon: MapPin, text: "Live GPS Tracking", color: "bg-brand-green/10 text-brand-green" },
    { icon: Star, text: "Safety & Hygiene Protocols", color: "bg-brand-orange/10 text-brand-orange" },
    { icon: ShieldCheck, text: "Certified Guardians", color: "bg-brand-purple/10 text-brand-purple" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-[#FFFCF0] py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center gap-3 p-4 sm:p-5 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-semibold text-[13px] sm:text-[15px] text-gray-800 leading-tight">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroFeatures;
