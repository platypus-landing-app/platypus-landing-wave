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
      image: "/Certified Guardians.jpeg"
    },
    {
      title: "Live GPS Tracking",
      description: "Stay connected and worry-free with live tracking and instant alerts.",
      image: "/Live GPS Tracking.png"
    },
    {
      title: "Back-Up Walkers",
      description: "No cancellations, your dog's walks are always on schedule.",
      image: "/Back-Up Walkers.png"
    },
    {
      title: "Safety & Hygiene",
      description: "Protecting your pet's health with the highest standards of care.",
      image: "/Safety & Hygiene.png"
    },
    {
      title: "Care Like Family",
      description: "Love, attention, and companionship just like you would give.",
      image: "/Care Like Family.png"
    },
    {
      title: "Flexible Scheduling",
      description: "Walks when you need them, perfectly fitting your routine.",
      image: "/Flexible Scheduling.png"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text mb-20">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          style={{ textDecorationColor: '#f97e57', color: '#f97e57' }}
        >
          <span className="underline decoration-[#f97e57] decoration-[1px] underline-offset-[17px]">
            Why Choose
          </span>
          <span className="text-black"> Platypus?</span>
        </h2>

          <p className="text-xl text-black font-weight-500 mx-auto leading-relaxed">
            We're Not Just Another Walking Service — We're India's First Certified And Tech-Enabled Dog Walking Experts.
          </p>
        </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {features.slice(0, 3).map((feature, index) => (
            <div 
              key={index} 
              className="text-center group cursor-pointer relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {feature.title}
              </h3>
              <p className="text-black text-base leading-relaxed max-w-sm mx-auto">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.slice(3, 6).map((feature, index) => (
            <div 
              key={index} 
              className="text-center group cursor-pointer relative"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-8 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {feature.title}
              </h3>
              <p className="text-black text-base leading-relaxed max-w-sm mx-auto">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;