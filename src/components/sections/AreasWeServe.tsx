import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AreasWeServe = () => {
  const locations = [
    'Bandra', 'Andheri', 'Powai', 'Worli', 'Lower Parel', 'Colaba',
    'Juhu', 'Versova', 'Malad', 'Borivali', 'Kandivali', 'Santacruz',
    'Khar', 'Byculla', 'Dadar', 'Matunga', 'Kurla', 'Chembur',
    'Ghatkopar', 'Mulund', 'Thane', 'Navi Mumbai', 'Vile Parle', 'Goregaon'
  ];

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
    <section id="areas" className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Areas <span className="text-orange-500">We Serve</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Walking Your Dog Is About To Get Smarter With Our AI-Powered App. Book And Track Walks In Real-Time, Get Rich Updates, And Manage Everything From One Place. Our Petwalking Service In Mumbai Covers Major Localities Across The City. Book Trained Dog Walkers In Bandra, Andheri, Powai, Colaba, Juhu, Worli, Chembur, Malad And More.
            </p>
          </div>
          <Button 
            onClick={() => handleScrollTo('#process')}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-medium hidden md:block rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            BOOK NOW
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {locations.map((location, index) => (
            <button
              key={index}
              className="flex items-center justify-center space-x-2 px-6 py-4 bg-white hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg border border-gray-100 hover:border-blue-200 hover:scale-105"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{location}</span>
            </button>
          ))}
        </div>

        {/* Mobile Book Now Button */}
        <div className="mt-12 md:hidden text-center">
          <Button 
            onClick={() => handleScrollTo('#process')}
            size="lg" 
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasWeServe;