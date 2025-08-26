import { Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const appFeatures = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Schedule walks in seconds with your preferred Guardian"
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Watch your pet's walk in real-time with GPS updates"
    },
    {
      icon: Star,
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-[#f97e57]"> <span className="underline decoration-[#f97e57] decoration-[1px] underline-offset-[9px]"> Coming </span> Soon</span> - Platypus App
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Walking Your Dog Is About To Get Smarter With Our AI-Powered App. Book And Track Walks In Real-Time, Get Rich Updates, And Manage Everything From One Place.
              </p>
            </div>

            <div className="space-y-6">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium"
            >
              BOOK TRIAL'S WALK NOW
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img 
              src={"/Live GPS Tracking.png"} 
              alt="Platypus App Preview" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Guardian Online Indicator */}
            <div className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Guardian Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;