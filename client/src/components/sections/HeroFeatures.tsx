'use client';

import { PawPrint, MapPin, ShieldCheck, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/ui/StaggerContainer";
import { motion } from "framer-motion";

/**
 * Direction D: four editorial stat tiles on bone scaffold, separated by hairline rules.
 * No colour floods on the icon bowls — monochrome iconography, one accent per card.
 */
const HeroFeatures = () => {
  const features = [
    { icon: PawPrint, label: "50+", text: "Dogs walked daily" },
    { icon: MapPin, label: "Live", text: "GPS tracking on every walk" },
    { icon: Star, label: "4.9", text: "Parent rating · 127 reviews" },
    { icon: ShieldCheck, label: "100%", text: "Certified guardians" },
  ];

  return (
    <section className="w-full bg-brand-bone border-y border-brand-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <ScrollReveal variant="fadeUp">
          <StaggerContainer
            staggerDelay={0.06}
            className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-x-10 lg:divide-x lg:divide-brand-rule"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="flex flex-col items-start text-left gap-3 lg:px-8 first:lg:pl-0 last:lg:pr-0"
                >
                  <Icon className="w-5 h-5 text-brand-ink" strokeWidth={1.5} />
                  <div className="font-domine text-[32px] md:text-[36px] leading-none font-medium text-brand-ink tracking-[-0.02em]">
                    {feature.label}
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-brand-slate font-semibold leading-snug">
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
