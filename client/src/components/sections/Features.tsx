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
      description:
        "Certified Guardians with tech-backed tracking ensure your pet is always in safe hands.",
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
      description: "No cancellations, your dog's walks are always on schedule.",
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
      className="py-16 lg:py-24 bg-white relative overflow-hidden"
    >
      {/* Background paw design - hidden on small screens */}
      <div
        className="hidden md:block absolute top-[-2rem] left-[-130px] w-[250px] h-[300px] lg:top-[-4.5rem] lg:left-[-318px] lg:w-[445px] lg:h-[516px] pointer-events-none"
        style={{
          backgroundImage: "url('/paw.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>

      {/* Content container - aligned with navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Platypus Heading */}
        {/* Why Choose Platypus Heading */}
        <div className="text-left mb-12 lg:mb-16">
          <h2 className="font-funnel font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-snug md:leading-tight lg:leading-tight capitalize mb-4 sm:mb-6">
            <span className="text-[#f97e57] relative inline-block mr-2 align-middle">
              Why Choose
              <span className="absolute left-0 w-full max-w-[140px] sm:max-w-[180px] h-0 border-b border-golden opacity-100 -bottom-1 sm:-bottom-2 lg:-bottom-4"></span>
            </span>
            <span className="text-gray-900 align-middle break-words leading-tight sm:leading-tight md:leading-[2]">
              Platypus?
            </span>
          </h2>

          <p className="font-rubik mt-4 sm:mt-6 font-normal text-[14px] sm:text-[16px] md:text-[16px] leading-[20px] sm:leading-[23px] md:leading-[23px] tracking-[0px] capitalize text-black max-w-full sm:max-w-3xl">
            We're Not Just Another Walking Service — We're India's First
            Certified And Tech-Enabled Dog Walking Experts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 justify-items-center">
          {features.map((feature, index) => (
           <div
  key={index}
  className="group cursor-pointer max-w-md w-full flex flex-col items-center text-center"
>

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 w-full">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
