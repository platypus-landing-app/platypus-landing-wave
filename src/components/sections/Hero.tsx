import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-dog-walker.jpg';

const Hero = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                <span className="text-yellow-500 drop-shadow-sm">PLATYPUS</span>
                <span className="text-gray-900"> - </span>
                <br />
                <span className="text-gray-900">INDIA'S DOG</span>
                <br />
                <span className="text-gray-900">WALKING EXPERTS</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-lg leading-relaxed font-medium">
              Book a Trial Walk Today: Safe, Joyful, Professionally Trained Walkers.<br />
              <span className="text-blue-600">Live GPS tracking</span> and verified Guardians across Mumbai.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button 
                onClick={() => handleScrollTo('#areas')}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Trial Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-sm rounded-full flex items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Live Now</div>
                  <div className="text-sm text-green-600 font-medium">Walking in your area</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:flex justify-center items-center hidden">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Professional dog walker with golden retriever" 
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl rounded-3xl"
              />
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-200 to-yellow-200 rounded-3xl -z-10 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center cursor-pointer hover:border-blue-700 transition-colors"
             onClick={() => handleScrollTo('#features')}>
          <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;