'use client';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import {
  Check,
  MapPin,
  Satellite,
  ShieldCheck,
  Camera,
  Dog,
  Clock,
  ClipboardList,
  UserCheck,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import { motion } from 'framer-motion';
import type { ServiceData } from '@/data/services';
import { getLocationNames } from '@/data/locations';

const featureIcons = [
  ShieldCheck,
  Satellite,
  Camera,
  Dog,
  ShieldCheck,
  CalendarDays,
  ClipboardList,
  UserCheck,
];

const featureColors = [
  '#247AFD',
  '#69D84F',
  '#FF5B00',
  '#C071FE',
  '#247AFD',
  '#69D84F',
  '#FF5B00',
  '#C071FE',
];

interface ActiveServicePageProps {
  service: ServiceData;
}

export default function ActiveServicePage({ service }: ActiveServicePageProps) {
  const { openTrialBooking } = useBooking();
  const locationNames = getLocationNames();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Breadcrumb
        items={[
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      <main className="pt-[70px] md:pt-[80px]">
        {/* Hero */}
        <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">our service</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">
                {service.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                {service.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={openTrialBooking}
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-6 text-lg rounded-full hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book Trial Walk — {service.price}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-12">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">the details</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What&apos;s Included
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Every walk is more than just a stroll — it&apos;s a complete care experience.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {service.features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                const color = featureColors[index % featureColors.length];
                return (
                  <motion.div
                    key={feature}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-brand transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-gray-700 text-base font-medium pt-1.5">{feature}</span>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFCF0] to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-12">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">find us nearby</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Areas We Serve
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Available across {locationNames.length}+ areas in Mumbai
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer
              staggerDelay={0.03}
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            >
              {locationNames.map((name) => (
                <motion.div key={name} variants={staggerItem}>
                  <Link
                    href={`/dog-walking/${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white rounded-full border border-brand-blue/15 text-gray-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 text-sm font-medium shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {name}
                  </Link>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="scaleUp">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] p-10 md:p-14 text-center shadow-2xl">
                <div className="absolute inset-0 bg-noise" />
                <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <span className="font-guttery text-brand-yellow text-lg sm:text-xl mb-3 block">let&apos;s go</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to Get Started?
                  </h3>
                  <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Book a trial walk with one of our certified Guardians and see the difference.
                  </p>
                  <Button
                    onClick={openTrialBooking}
                    size="lg"
                    className="bg-[#FFE135] hover:bg-[#E6CA2F] text-gray-900 font-bold px-8 py-6 text-lg rounded-full hover:-translate-y-0.5 hover:shadow-warm transition-all duration-300"
                  >
                    Book Trial Walk — {service.price}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
