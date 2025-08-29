import { PawPrint, MapPin, ShieldCheck } from "lucide-react";

const HeroFeatures = () => {
  const features = [
    { icon: PawPrint, text: "50+ Dogs Walked Daily", type: "icon" as const },
    { icon: MapPin, text: "Live GPS Tracking", type: "icon" as const },
    { icon: undefined, image: "/feature star.png", text: "Safety & Hygiene Protocols", type: "img" as const },
    { icon: ShieldCheck, text: "Certified Walkers", type: "icon" as const },
  ];

  return (
<section
  id="features"
  className="w-full bg-[#f6f7f9] py-12"
>
  {/* Container aligned with Navbar */}
  <div className="max-w-[1310px] mx-auto px-6 sm:px-8 lg:px-12">
    <div className="flex justify-center">
      <div className="flex items-center gap-12 px-10 sm:px-16 py-6 bg-white rounded-2xl shadow-[0px_8px_25px_-5px_rgba(57,124,236,0.15)] 
        overflow-x-auto md:overflow-x-visible custom-scroller">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 min-w-[220px] flex-shrink-0"
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
            <span className="font-funnel font-semibold text-[20px] leading-[27.78px] text-black whitespace-nowrap">
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
