'use client';

import { PawPrint, MapPin, ShieldCheck } from "lucide-react";

const HeroFeatures = () => {
  const features = [
    { icon: PawPrint, text: "50+ Dogs Walked Daily", type: "icon" as const },
    { icon: MapPin, text: "Live GPS Tracking", type: "icon" as const },
    {
      icon: undefined,
      image: "/feature star.png",
      text: "Safety & Hygiene Protocols",
      type: "img" as const,
    },
    { icon: ShieldCheck, text: "Certified Walkers", type: "icon" as const },
  ];

  return (
    <section id="features" className="w-full bg-white sm:pt-9 py-1">
      {/* Container aligned with Navbar */}
      <div className="max-w-[1310px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-center">
          <div
            className="flex flex-wrap justify-left items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 
  px-6 sm:px-10 md:px-12 py-6 bg-white rounded-2xl 
  shadow-[0px_8px_25px_-5px_rgba(57,124,236,0.15)]"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 flex-shrink-0 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]"
              >
                {feature.type === "icon" && feature.icon ? (
                  <feature.icon className="w-6 h-6 text-[#397CEF]" />
                ) : (
                  <img
                    src={feature.image}
                    alt={feature.text}
                    className="w-6 h-6"
                  />
                )}
                <span className="font-funnel font-semibold text-[16px] sm:text-[18px] md:text-[20px] text-black whitespace-nowrap">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFeatures;
