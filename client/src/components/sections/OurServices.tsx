'use client';

import Link from 'next/link';
import { Footprints, Scissors, GraduationCap, Home, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import { motion } from 'framer-motion';

const accentColors = ['bg-brand-blue', 'bg-brand-yellow', 'bg-brand-purple', 'bg-brand-green'];

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
    <section id="services" className="py-16 md:py-24 bg-[#FFFCF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-12">
            <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">what we offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete pet care solutions — from daily walks to grooming, training, and sitting.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((svc, index) => {
            const Icon = svc.icon;
            const isActive = svc.status === 'active';
            return (
              <motion.div key={svc.slug} variants={staggerItem}>
                <Link
                  href={`/services/${svc.slug}`}
                  className="group block h-full"
                >
                  <div className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col items-start text-left relative overflow-hidden
                    ${isActive
                      ? 'bg-gradient-to-br from-[#247AFD] to-[#1A5BC4] text-white shadow-brand-lg hover:shadow-[0_16px_40px_-8px_rgba(36,122,253,0.4)]'
                      : 'bg-white border border-gray-100 hover:shadow-brand-lg'
                    }`}
                  >
                    {/* Left accent bar (coming-soon only) */}
                    {!isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColors[index]}`} />}

                    {/* Decorative circle for active card */}
                    {isActive && (
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                    )}

                    <div className="flex items-center gap-3 mb-4 pl-3">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                        ${isActive ? 'bg-white/20' : 'bg-blue-50 group-hover:bg-blue-100'}`}
                      >
                        <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-[#247AFD]'}`} />
                      </div>
                      {isActive && (
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
                        </span>
                      )}
                    </div>
                    <div className="pl-3 flex-1 flex flex-col">
                      <h3 className={`text-lg font-bold mb-1 transition-colors
                        ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-[#247AFD]'}`}
                      >
                        {svc.name}
                      </h3>
                      {svc.status === 'coming-soon' && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-2 text-xs">
                          Coming Soon
                        </Badge>
                      )}
                      <p className={`text-sm leading-relaxed flex-1 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {svc.tagline}
                      </p>
                      <div className={`mt-4 flex items-center text-sm font-semibold
                        ${isActive ? 'text-brand-yellow' : 'text-[#247AFD]'}`}
                      >
                        {isActive ? 'Book Now' : 'Get Notified'}
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default OurServices;
