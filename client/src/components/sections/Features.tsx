'use client';

import ScrollReveal from "@/components/ui/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/ui/StaggerContainer";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "Certified Guardians",
      description:
        "Tech-backed tracking ensures your pet is always in safe hands.",
      image: "/Certified Guardians.jpeg",
    },
    {
      title: "Live GPS Tracking",
      description:
        "Stay connected and worry-free with live tracking and instant alerts.",
      image: "/Live GPS Tracking.png",
    },
    {
      title: "Back-Up Walkers",
      description: "No cancellations — your dog's walks are always on schedule.",
      image: "/Back-Up Walkers.png",
    },
    {
      title: "Safety & Hygiene",
      description:
        "Protecting your pet's health with the highest standards of care.",
      image: "/Safety & Hygiene.png",
    },
    {
      title: "Care Like Family",
      description:
        "Love, attention, and companionship just like you would give.",
      image: "/Care Like Family.png",
    },
    {
      title: "Flexible Scheduling",
      description: "Walks when you need them, perfectly fitting your routine.",
      image: "/Flexible Scheduling.png",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#FFFCF0] to-white relative overflow-hidden"
    >
      {/* Background paw design */}
      <img
        src="/paw.png"
        alt=""
        loading="lazy"
        decoding="async"
        className="hidden md:block absolute top-[-2rem] left-[-130px] w-[250px] h-[300px] lg:top-[-4.5rem] lg:left-[-318px] lg:w-[445px] lg:h-[516px] pointer-events-none object-contain"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="text-left mb-12 lg:mb-16">
            <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">India&apos;s first certified service</span>
            <h2 className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight capitalize mb-4 sm:mb-6">
              <span className="text-[#FF5B00] relative inline-block mr-2 align-middle">
                Why Choose
                <span className="absolute left-0 w-full max-w-[140px] sm:max-w-[180px] h-0 border-b border-golden opacity-100 -bottom-1 sm:-bottom-2 lg:-bottom-4"></span>
              </span>
              <span className="text-gray-900 align-middle break-words leading-tight sm:leading-tight md:leading-[2]">
                Platypus?
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 font-normal text-[14px] sm:text-[16px] md:text-[16px] leading-[20px] sm:leading-[23px] md:leading-[23px] tracking-[0px] capitalize text-black max-w-full sm:max-w-3xl">
              We&apos;re Not Just Another Walking Service — We&apos;re India&apos;s First
              Certified And Tech-Enabled Dog Walking Experts.
            </p>
          </div>
        </ScrollReveal>

        {/* Magazine-style overlay cards */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group cursor-pointer relative rounded-2xl overflow-hidden h-[320px] md:h-[360px] shadow-md hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-2"
            >
              {/* Full-bleed image */}
              <picture>
                <source
                  type="image/avif"
                  srcSet={`/optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}-small.avif 400w, /optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}-medium.avif 800w, /optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}.avif 910w`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 910px"
                />
                <source
                  type="image/webp"
                  srcSet={`/optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}-small.webp 400w, /optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}-medium.webp 800w, /optimized/${encodeURIComponent(feature.image.replace(/^\//, '').replace(/\.(png|jpe?g)$/i, ''))}.webp 910w`}
                  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 910px"
                />
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </picture>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Text content floating at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-[22px] leading-[28px] text-white mb-2 drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="font-normal text-[14px] leading-[22px] text-white/85 drop-shadow-sm">
                  {feature.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Features;
