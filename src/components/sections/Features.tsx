import { PawPrint, MapPin, ShieldCheck } from "lucide-react";

const Features = () => {
  // HeroFeatures data
  const heroFeatures = [
    { icon: PawPrint, text: "50+ Dogs Walked Daily", type: "icon" },
    { icon: MapPin, text: "Live GPS Tracking", type: "icon" },
    { icon: ShieldCheck, text: "Certified Walkers", type: "icon" },
    { icon: ShieldCheck, text: "Certified Walkers", type: "icon" },
  ];

  // Features data
  const features = [
    {
      title: "Certified Guardians",
      description: "Certified Guardians with tech-backed tracking ensure your pet is always in safe hands.",
      image: "/Certified Guardians.jpeg"
    },
    {
      title: "Live GPS Tracking",
      description: "Stay connected and worry-free with live tracking and instant alerts.",
      image: "/Live GPS Tracking.png"
    },
    {
      title: "Back-Up Walkers",
      description: "No cancellations, your dog's walks are always on schedule.",
      image: "/Back-Up Walkers.png"
    },
    {
      title: "Safety & Hygiene",
      description: "Protecting your pet's health with the highest standards of care.",
      image: "/Safety & Hygiene.png"
    },
    {
      title: "Care Like Family",
      description: "Love, attention, and companionship just like you would give.",
      image: "/Care Like Family.png"
    },
    {
      title: "Flexible Scheduling",
      description: "Walks when you need them, perfectly fitting your routine.",
      image: "/Flexible Scheduling.png"
    }
  ];

  return (
 <section
  id="features"
  className="relative w-85 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-white"
>
  {/* Background paw design */}
<div
  className="absolute top-[-4.5rem] left-[-318px] w-[445px] h-[516px] pointer-events-none"
  style={{
    backgroundImage: "url('/paw.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  }}
></div>

  {/* Content wrapper - keep above background */}
  <div className="relative z-10">
    {/* Why Choose Platypus Heading */}
    <div className="text-left mb-12 lg:mb-16 max-w-4xl mx-auto lg:mx-0">
      <h2 className="font-funnel font-bold text-[60px] leading-[18px] capitalize mb-6">
        <span className="text-[#f97e57] relative">
          Why Choose
          <span className="absolute bottom-[-10px] left-0 w-[220px] h-0 border-b border-golden opacity-100"></span>
        </span>
        <span className="text-gray-900"> Platypus?</span>
      </h2>

      <p className="font-rubik mt-9 font-normal text-[16px] leading-[23px] tracking-[0px] capitalize text-black max-w-3xl">
        We're Not Just Another Walking Service — We're India's First Certified
        And Tech-Enabled Dog Walking Experts.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group cursor-pointer max-w-sm w-full flex flex-col items-center text-center"
        >
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 w-full">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="px-4 flex flex-col items-center text-center">
            <h3 className="font-funnel font-bold text-[24px] leading-[33.25px] text-[#397CEF] mb-3">
              {feature.title}
            </h3>
            <p className="font-funnel font-normal text-[16px] leading-[27.06px] text-black">
              {feature.description}
            </p>
            <div className="h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 mt-4 self-start"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Features;