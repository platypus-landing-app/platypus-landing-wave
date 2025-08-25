import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-dog-walker.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-yellow-500">PLATYPUS</span>
                <span className="text-gray-900"> - </span>
                <br />
                <span className="text-gray-900">INDIA'S DOG</span>
                <br />
                <span className="text-gray-900">WALKING EXPERTS</span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
              Book a Trial Walk Today: Safe, Joyful, Professionally Trained Walkers.<br />
              Live GPS tracking and verified Guardians across Mumbai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-md"
              >
                Book Trial Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-4 text-sm rounded-full flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Live Now</div>
                  <div className="text-xs text-green-600">Walking in your area</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:flex justify-center items-center hidden">
            <img 
              src={heroImage} 
              alt="Professional dog walker with golden retriever" 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;