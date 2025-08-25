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
    <section id="process" className="py-24 bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-yellow-400">Process</span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            From Booking To Happy Returns, We've Made Pet Care As Simple As Four Easy Steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center text-white relative">
              {/* Dotted line connector - only show for non-last items */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 border-t-2 border-dotted border-white/30 transform translate-x-8"></div>
              )}
              
              {/* Icon container with curved background */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden">
                  {/* Curved bottom design */}
                  <div className="absolute bottom-0 w-full h-8 bg-white/5 rounded-b-full"></div>
                  <step.icon className="w-12 h-12 text-white relative z-10" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;