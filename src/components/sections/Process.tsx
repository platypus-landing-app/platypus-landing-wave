import { Calendar, User, Heart, MapPin } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      icon: Calendar,
      title: "Book In Seconds",
      description: "Register On The App And Schedule Your Dog's Walk With Ease."
    },
    {
      icon: User,
      title: "Guardian Assigned",
      description: "A Trained & Certified Guardian Is Instantly Matched To Your Booking."
    },
    {
      icon: Heart,
      title: "Safe Pick-Up",
      description: "Your Dog Is Collected On Time, Following Hygiene & Safety Checks."
    },
    {
      icon: MapPin,
      title: "Track The Walk",
      description: "Monitor Every Step Live On The App, With Real-Time Updates On Activity And Poop."
    }
  ];

  return (
    <section id="process" className="py-20 bg-[#0088FF] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[#0088FF] opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            Our <span className="text-white">Process</span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            From Booking To Happy Returns, We've Made Pet Care As Simple As Four Easy Steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="text-center text-white relative group flex flex-col items-center"
            >
              {/* Dotted line connector */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 border-t-2 border-dotted border-white/40 z-0"></div>
              )}
              
              {/* Icon container */}
              <div className="relative mb-12 group-hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full border-2 border-white/50
                              flex items-center justify-center relative
                              backdrop-blur-sm shadow-xl group-hover:bg-white/30 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2
                              w-0.5 h-6 bg-white/60"></div>
                <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2
                              w-[120px] h-[70px] border-[10px] border-white border-t-0 
                              rounded-b-full bg-transparent"></div>
              </div>

              {/* Text section */}
              <div className="mt-4 px-3">
                <h3 className="font-[Funnel_Sans] font-bold text-[20px] leading-[27px] text-white text-center capitalize group-hover:text-yellow-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="mt-3 font-[Funnel_Sans] font-normal text-[16px] leading-[25px] text-white text-center capitalize">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
