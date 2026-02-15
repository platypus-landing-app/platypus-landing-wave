'use client';

import { ChevronRight } from 'lucide-react';

const Process = () => {
  const processSteps = [
    {
      image: '/processicon1.png',
      title: "Hassle-Free Booking",
      description: "Complete the Pet Profile Form to book your dog’s walk in just a few clicks.",
      imagePosition: "top-0 left-0", 
      imageSize: "w-[4rem] h-[4rem]"  // 👈 yaha define
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
    <section id="process" className="py-20 bg-[#247AFD] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#247AFD] opacity-90"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 relative z-10">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-4">
      Our <span className="text-white">Process</span>
    </h2>
    <p className="text-lg text-white max-w-2xl mx-auto">
      From Booking To Happy Returns, We've Made Pet Care As Simple As Four Easy Steps.
    </p>
  </div>


<div className="flex justify-start">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-start">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="text-center text-white relative group flex flex-col items-center"
            >
              {index < processSteps.length - 1 && (
                <>
                  <div
                    className="hidden lg:block absolute top-[2rem] left-[68%] w-[130px] h-[3px] z-0"
                    style={{
                      backgroundImage: "repeating-linear-gradient(to right, white 0 6px, transparent 6px 12px)"
                    }}
                  ></div>
                  <div className="hidden md:block absolute top-[1.5rem] left-[calc(59%+115px)] lg:left-[calc(64%+135px)] z-10">
                    <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                </>
              )}

              {/* image container */}
              <div className="relative mb-12 transition-transform duration-300">
                <div className={`${step.imageSize} mx-auto flex items-center justify-center relative`}>
                  <img
                    src={step.image}
                    loading="lazy"
                    decoding="async"
                    className={`absolute ${step.imagePosition} max-w-full max-h-full object-contain`}
                    alt={step.title}
                  />
                </div>
                <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2
                              w-[120px] h-[70px] border-[13px] border-[#FFF7D9] border-t-0 
                              rounded-b-full bg-transparent"></div>
              </div>

              <div className="mt-4 px-3">
                <h3 className="font-[Funnel_Sans] font-bold text-[20px] leading-[27px] text-white text-center capitalize group-hover:text-yellow-200 transition-colors duration-300">
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
      </div>
    </section>
  );
};

export default Process;
