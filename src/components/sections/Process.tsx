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
    <section id="process" className="py-28 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-yellow-400/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our <span className="text-yellow-400 drop-shadow-lg">Process</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From Booking To Happy Returns, We've Made Pet Care As Simple As Four Easy Steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className="text-center text-white relative group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Dotted line connector - only show for non-last items */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 border-t-2 border-dotted border-white/30 transform translate-x-8 z-0"></div>
              )}
              
              {/* Icon container with curved background */}
              <div className="relative mb-8 group-hover:scale-110 transition-transform duration-300">
                <div className="w-40 h-40 mx-auto bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl group-hover:bg-white/20 transition-all duration-300">
                  {/* Curved bottom design */}
                  <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-white/10 to-transparent rounded-b-full"></div>
                  <step.icon className="w-16 h-16 text-white relative z-10 drop-shadow-lg" />
                </div>
                
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-white/80 text-base leading-relaxed max-w-xs mx-auto">
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