import { CheckCircle } from 'lucide-react';

const About = () => {
  const benefits = [
    "Unique hybrid approach combining the best of both worlds",
    "Adaptive technology that evolves with your needs",
    "Intuitive design inspired by nature's most versatile creature",
    "Seamless integration across all platforms and devices"
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose
              <span className="block bg-gradient-ocean bg-clip-text text-transparent">
                Platypus?
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Just like the remarkable platypus that seamlessly navigates both aquatic and terrestrial environments, 
              our platform bridges the gap between different technologies and user needs, creating a unique and 
              powerful solution.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Placeholder for illustration */}
            <div className="aspect-square bg-gradient-wave rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-ocean opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-primary/30 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-16 h-16 bg-wave-primary/40 rounded-full animate-float"></div>
              </div>
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-wave-secondary/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;