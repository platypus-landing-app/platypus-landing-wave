import certifiedGuardians from '@/assets/certified-guardians.jpg';
import gpsTracking from '@/assets/gps-tracking.jpg';
import backupWalkers from '@/assets/backup-walkers.jpg';
import safetyHygiene from '@/assets/safety-hygiene.jpg';
import careFamily from '@/assets/care-family.jpg';
import flexibleScheduling from '@/assets/flexible-scheduling.jpg';

const Features = () => {
  const features = [
    {
      title: "Certified Guardians",
      description: "Certified Guardians with tech-backed tracking ensure your pet is always in safe hands.",
      image: certifiedGuardians
    },
    {
      title: "Live GPS Tracking",
      description: "Stay connected and worry-free with live tracking and instant alerts.",
      image: gpsTracking
    },
    {
      title: "Back-Up Walkers",
      description: "No cancellations, your dog's walks are always on schedule.",
      image: backupWalkers
    },
    {
      title: "Safety & Hygiene",
      description: "Protecting your pet's health with the highest standards of care.",
      image: safetyHygiene
    },
    {
      title: "Care Like Family",
      description: "Love, attention, and companionship just like you would give.",
      image: careFamily
    },
    {
      title: "Flexible Scheduling",
      description: "Walks when you need them, perfectly fitting your routine.",
      image: flexibleScheduling
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-orange-500">Platypus?</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            We're Not Just Another Walking Service — We're India's First Certified And Tech-Enabled Dog Walking Experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(3, 6).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;