'use client';

import Link from 'next/link';
import { Footprints, Scissors, GraduationCap, Home, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const serviceCards = [
  {
    slug: 'dog-walking',
    name: 'Dog Walking',
    tagline: 'Safe, structured walks by certified Guardians',
    icon: Footprints,
    status: 'active' as const,
  },
  {
    slug: 'dog-grooming',
    name: 'Dog Grooming',
    tagline: 'Professional grooming, coming to your doorstep',
    icon: Scissors,
    status: 'coming-soon' as const,
  },
  {
    slug: 'dog-training',
    name: 'Dog Training',
    tagline: 'Positive reinforcement training for happier dogs',
    icon: GraduationCap,
    status: 'coming-soon' as const,
  },
  {
    slug: 'pet-sitting',
    name: 'Pet Sitting',
    tagline: 'Trusted care when you\'re away',
    icon: Home,
    status: 'coming-soon' as const,
  },
];

const OurServices = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Complete pet care solutions — from daily walks to grooming, training, and sitting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group block"
              >
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-7 h-7 text-[#247AFD]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#247AFD] transition-colors">
                    {svc.name}
                  </h3>
                  {svc.status === 'coming-soon' && (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-2 text-xs">
                      Coming Soon
                    </Badge>
                  )}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{svc.tagline}</p>
                  <div className="mt-4 flex items-center text-[#247AFD] text-sm font-semibold">
                    {svc.status === 'active' ? 'Learn More' : 'Get Notified'}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
