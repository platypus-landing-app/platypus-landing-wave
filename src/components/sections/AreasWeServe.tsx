import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AreasWeServe = () => {
  const locations = [
    'Bandra', 'Andheri', 'Powai', 'Worli', 'Lower Parel', 'Colaba',
    'Juhu', 'Versova', 'Malad', 'Borivali', 'Kandivali', 'Santacruz',
    'Khar', 'Byculla', 'Dadar', 'Matunga', 'Kurla', 'Chembur',
    'Ghatkopar', 'Mulund', 'Thane', 'Navi Mumbai', 'Vile Parle', 'Goregaon'
  ];

  return (
    <section id="areas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-12">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Areas <span className="text-orange-500">We Serve</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Walking Your Dog Is About To Get Smarter With Our AI-Powered App. Book And Track Walks In Real-Time, Get RichOur Petwalking Service In Mumbai Covers Major Localities Across The City. Book Trained Dog Walkers In Bandra, Andheri, Powai, Colaba, Juhu, Worli, Chembur, Malad And More.H Updates, And Manage Everything From One Place.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium hidden md:block"
          >
            BOOK NOW
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((location, index) => (
            <button
              key={index}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{location}</span>
            </button>
          ))}
        </div>

        {/* Mobile Book Now Button */}
        <div className="mt-8 md:hidden">
          <Button 
            size="lg" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasWeServe;