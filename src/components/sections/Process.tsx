import { ChevronRight } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      image: '/processicon1.png',
      title: "Book In Seconds",
      description: "Register On The App And Schedule Your Dog's Walk With Ease.",
      imagePosition: "top-0 left-0" // default
    },
    {
      image: '/processicon2.png',
      title: "Guardian Assigned",
      description: "A Trained & Certified Guardian Is Instantly Matched To Your Booking.",
      imagePosition: "bottom-1 left-[9px]"
    },
    {
      image: '/process icon3.png',
      title: "Safe Pick-Up",
      description: "Your Dog Is Collected On Time, Following Hygiene & Safety Checks.",
      imagePosition: "top-0 left-0"
    },
    {
      image: '/processicon4.png',
      title: "Track The Walk",
      description: "Monitor Every Step Live On The App, With Real-Time Updates On Activity And Poop.",
      imagePosition: "top-0 left-0"
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
              {/* Responsive dotted line connector with arrow */}
              {index < processSteps.length - 1 && (
                <>
                  {/* Desktop dotted line */}
                  <div className="hidden lg:block absolute top-[2rem] left-[68%] w-[135px] h-0.5 border-t-2 border-dotted border-[#FFFFFF] z-0"></div>
                  
                  {/* Tablet dotted line */}
                  <div className="hidden md:block lg:hidden absolute top-[2rem] left-[68%] w-[120px] h-0.5 border-t-2 border-dotted border-[#FFFFFF] z-0"></div>
                  
                  {/* Arrow at the end - Desktop */}
                  <div className="hidden lg:block absolute top-[1.75rem] left-[calc(68%+135px)] z-10">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* Arrow at the end - Tablet */}
                  <div className="hidden md:block lg:hidden absolute top-[1.75rem] left-[calc(68%+120px)] z-10">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                </>
              )}
              
              {/* image container */}
              <div className="relative mb-12 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto flex items-center justify-center relative">
                  <img 
                    src={step.image} 
                    className={`absolute ${step.imagePosition} max-w-full max-h-full object-contain`} 
                    alt={step.title} 
                  />
                </div>
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
