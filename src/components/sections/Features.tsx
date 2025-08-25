import { Zap, Shield, Waves, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast performance that adapts to your needs, just like the platypus adapts to water and land."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with security at its core, protecting your data with multiple layers of defense mechanisms."
    },
    {
      icon: Waves,
      title: "Fluid Experience",
      description: "Seamlessly navigate through features with our intuitive interface that flows like water."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together effortlessly with built-in collaboration tools designed for modern teams."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Unique Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes Platypus the perfect solution for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;