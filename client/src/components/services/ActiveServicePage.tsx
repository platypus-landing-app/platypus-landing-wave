'use client';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { Check, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { ServiceData } from '@/data/services';
import { getLocationNames } from '@/data/locations';

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
        <section className="relative bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {service.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-8">
                {service.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={openTrialBooking}
                  size="lg"
                  className="bg-[#FFE135] hover:bg-[#E6CA2F] text-gray-900 font-bold px-8 py-6 text-lg"
                >
                  Book Trial Walk — {service.price}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              What&apos;s Included
            </h2>
            <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
              Every walk is more than just a stroll — it&apos;s a complete care experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Areas We Serve
            </h2>
            <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
              Available across {locationNames.length}+ areas in Mumbai
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {locationNames.map((name) => (
                <Link
                  key={name}
                  href={`/dog-walking/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 hover:border-[#247AFD] hover:text-[#247AFD] transition-colors text-sm font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] p-10 md:p-14 text-center shadow-2xl">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Ready to Get Started?
                </h3>
                <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto">
                  Book a trial walk with one of our certified Guardians and see the difference.
                </p>
                <Button
                  onClick={openTrialBooking}
                  size="lg"
                  className="bg-[#FFE135] hover:bg-[#E6CA2F] text-gray-900 font-bold px-8 py-6 text-lg"
                >
                  Book Trial Walk — {service.price}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
