import { PawPrint, MapPin, ShieldCheck } from "lucide-react";
import  HeartHandshake  from "/feature star.png";
const HeroFeatures = () => {
  const features = [
    { icon: PawPrint, text: "50+ Dogs Walked Daily", type: "icon" },
    { icon: MapPin, text: "Live GPS Tracking", type: "icon" },
    { icon: HeartHandshake, text: "Safety & Hygiene Protocols", type: "img" },
    { icon: ShieldCheck, text: "Certified Walkers", type: "icon" },
  ];

  return (
    <section
      id="features"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex justify-center">
        {/* Box with scroll support on small devices */}
        <div className="flex items-center gap-12 px-6 py-6 bg-white rounded-2xl shadow-[0px_8px_25px_-5px_rgba(57,124,236,0.15)] overflow-x-auto scrollbar-hide">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-[220px] flex-shrink-0"
            >
              {feature.type === "icon" ? (
                <feature.icon className="w-6 h-6 text-[#397CEF]" />
              ) : (
                <img
                  src={feature.icon}
                  alt={feature.text}
                  className="w-6 h-6"
                />
              )}
            <span className="font-funnel font-semibold text-[20px] leading-[27.78px] text-black whitespace-nowrap">
            {feature.text}
            </span>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroFeatures;
