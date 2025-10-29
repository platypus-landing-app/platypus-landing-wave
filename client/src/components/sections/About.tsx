import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

const About = () => {
  const { openTrialBooking } = useBooking();
  const appFeatures = [
    {
      icon: "/coming soon1.png",
      title: "Easy Booking",
      description: "Schedule walks in seconds with your preferred Guardian",
    },
    {
      icon: "/coming soon2.png",
      title: "Live Tracking",
      description: "Watch your pet's walk in real-time with GPS updates",
    },
    {
      icon: "/coming soon3.png",
      title: "Guardian Ratings",
      description: "Rate and review your Guardian after each walk",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-[#eaeff8] bg-cover bg-center relative"
      style={{ backgroundImage: "url('/aboutus bg.png')" }}
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
<h2 className="text-[1.6rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[2.82rem] font-bold text-yellow-400 mb-4 leading-tight">                <span className="relative inline-block mr-2 align-middle">
                  <span className="text-[#f97e57] font-bold">Coming</span>
                  <span className="text-black font-normal"> Soon</span>
                  {/* underline */}
                  <span
                    className="absolute left-0 w-full border-b border-golden 
                    -bottom-2 sm:-bottom-3 lg:-bottom-4"
                  ></span>
                </span>
                <span className="text-black font-normal align-middle break-words leading-[1.6]">
                  – Platypus App
                </span>
              </h2>

              <p className="font-rubik mt-9 font-normal text-[16px] leading-[23px] tracking-[0px] capitalize text-black max-w-3xl">
                Walking Your Dog Is About To Get Smarter With Our AI-Powered
                App. Book And Track Walks In Real-Time, Get Rich Updates, And
                Manage Everything From One Place.
              </p>
            </div>

            <div className="space-y-6">
              {appFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex min-h-[84px] items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-[#FFFFFF] rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      loading="lazy"
                      decoding="async"
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    {/* Heading */}
                    <h3 className="font-funnel font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#363D49] mb-1">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="font-funnel font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#7B879D] break-words">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

<Button
  onClick={openTrialBooking}
  size="lg"
  className="w-full sm:w-auto text-white px-8 py-4 
    font-funnel font-bold text-[16.51px] leading-[24.4px] 
    tracking-[1.25px] uppercase text-center rounded
    border-0 shadow-none focus:ring-0
    bg-blue-500 hover:bg-blue-400 rounded hover:shadow-xl 
    transition-all duration-300 hover:scale-105"
>
  BOOK TRIAL WALK NOW
</Button>

          </div>

          {/* Right Image */}

<div className="relative overflow-hidden">
  {/* Mobile Image */}
  <img
    src="/aboutus contact mobile.png"
    alt="Platypus App Mobile Preview"
    loading="lazy"
    decoding="async"
    className="block md:hidden w-full max-w-md mx-auto h-auto rounded-2xl"
  />

  {/* Desktop Image */}
  <img
    src={"/aboutus contact.png"}
    alt="Platypus App Preview"
    loading="lazy"
    decoding="async"
    className="hidden md:block w-full max-w-md mx-auto h-auto rounded-2xl lg:max-w-lg xl:max-w-xl lg:ml-auto"
  />
</div>


        </div>
      </div>
    </section>
  );
};

export default About;
