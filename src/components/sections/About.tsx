import { Button } from '@/components/ui/button';

const About = () => {
  const appFeatures = [
    {
      icon: "/coming soon1.png",
      title: "Easy Booking",
      description: "Schedule walks in seconds with your preferred Guardian"
    },
    {
      icon: "/coming soon2.png",
      title: "Live Tracking",
      description: "Watch your pet's walk in real-time with GPS updates"
    },
    {
      icon: "/coming soon3.png",
      title: "Guardian Ratings",
      description: "Rate and review your Guardian after each walk"
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#eaeff8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
             <h2 className="text-[40px] md:text-[50px] lg:text-[60px] font-funnel mb-4 capitalize whitespace-nowrap">
                <span className="text-[#f97e57] font-bold">
                   <span className="relative">
                     Coming
                     <span className="absolute bottom-[-10px] left-0 w-full max-w-[220px] h-0 border-b border-golden opacity-100"></span>
                   </span>
                </span>
                <span className="text-black font-normal"> Soon</span> – Platypus App
              </h2>

            <p className="font-funnel font-normal text-[18px] leading-[28px] text-black capitalize">
              Walking Your Dog Is About To Get Smarter With Our AI-Powered App. Book And Track Walks In Real-Time, Get Rich Updates, And Manage Everything From One Place.
            </p>

            </div>

          <div className="space-y-6">
            {appFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex h-[84px] items-start space-x-4 p-4 bg-[#FFFFFF] rounded-lg shadow-sm"
              >
                {/* Icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src={feature.icon} alt={feature.title} className="w-5 h-5 object-contain" />
                </div>

                {/* Text */}
                <div>
                  {/* Heading */}
                  <h3 className="font-funnel font-normal text-[16px] leading-[24px] text-[#363D49] mb-1">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-funnel font-normal text-[16px] leading-[24px] text-[#7B879D]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button 
            size="lg" 
            className="bg-[#397CEF] hover:bg-blue-400 text-white px-8 py-4 
                      font-funnel font-bold text-[16.51px] leading-[24.4px] 
                      tracking-[1.25px] uppercase text-center rounded-xl"
          >
            BOOK TRIAL'S WALK NOW
          </Button>

          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src={"/aboutus contact.png"} 
              alt="Platypus App Preview" 
              className="w-full max-w-md mx-auto h-auto rounded-2xl lg:w-[592.px] lg:relative lg:top-[40px] lg:left-[170px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;