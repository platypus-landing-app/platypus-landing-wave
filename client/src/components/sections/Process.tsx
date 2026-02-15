'use client';

import { ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import WaveDivider from '@/components/ui/WaveDivider';
import { motion } from 'framer-motion';

const Process = () => {
  const processSteps = [
    {
      image: '/processicon1.png',
      title: "Hassle-Free Booking",
      description: "Complete the Pet Profile Form to book your dog's walk in just a few clicks.",
      imagePosition: "top-0 left-0",
      imageSize: "w-[4rem] h-[4rem]"
    },
    {
      image: '/processicon2.png',
      title: "Guardian Assigned",
      description: "A Trained & Certified Guardian Is Instantly Matched To Your Booking.",
      imagePosition: "bottom-1 left-[9px]",
      imageSize: "w-[4rem] h-[4rem]"
    },
    {
      image: '/process icon3.png',
      title: "Safe Pick-Up",
      description: "Your Dog Is Collected On Time, Following Hygiene & Safety Checks.",
      imagePosition: "top-[9px] left-0",
      imageSize: "w-[3.5rem] h-[3.5rem]"
    },
    {
      image: '/processicon4.png',
      title: "Track The Walk",
      description: "Monitor every step with real-time Tracking and updates on activity and poop.",
      imagePosition: "top-0 left-0",
      imageSize: "w-[4rem] h-[4rem]"
    }
  ];

  return (
    <div className="relative">
      {/* Wave top — blends from AreasWeServe's white */}
      <WaveDivider color="#247AFD" className="relative -mb-1 bg-white" />

      <section id="process" className="py-20 bg-[#247AFD] relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise" />

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-[120px] h-[120px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute bottom-20 left-[-30px] w-[100px] h-[100px] rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-4">
                Our <span className="text-white">Process</span>
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                From Booking To Happy Returns, We&apos;ve Made Pet Care As Simple As Four Easy Steps.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex justify-start">
            <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-start">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="text-center text-white relative group flex flex-col items-center"
                >
                  {/* Connector line between steps */}
                  {index < processSteps.length - 1 && (
                    <>
                      <div
                        className="hidden lg:block absolute top-[2.5rem] left-[68%] w-[120px] h-[2px] z-0"
                        style={{
                          backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0 8px, transparent 8px 16px)"
                        }}
                      />
                      <div className="hidden lg:block absolute top-[calc(2.5rem-4px)] left-[calc(68%+120px)] z-10">
                        <ChevronRight className="w-4 h-4 text-white/60" strokeWidth={3} />
                      </div>
                    </>
                  )}

                  {/* Step number circle + icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto group-hover:bg-white/20 group-hover:border-brand-yellow/50 transition-all duration-300">
                      <img
                        src={step.image}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 object-contain"
                        alt={step.title}
                      />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-yellow text-gray-900 text-xs font-bold flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>
                  </div>

                  <div className="px-2">
                    <h3 className="font-bold text-[20px] leading-[27px] text-white text-center capitalize group-hover:text-yellow-200 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-normal text-[15px] leading-[24px] text-white/70 text-center capitalize">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Wave bottom — blends into Testimonials' white */}
      <WaveDivider color="#ffffff" flip className="relative -mt-1 bg-[#247AFD]" />
    </div>
  );
};

export default Process;
