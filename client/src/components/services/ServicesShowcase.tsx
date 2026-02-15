'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { Footprints, Scissors, GraduationCap, Home, ArrowRight, Bell, Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import type { ServiceData } from '@/data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Scissors,
  GraduationCap,
  Home,
};

const accentColors = ['#69D84F', '#C071FE', '#FF5B00'];

interface ServicesShowcaseProps {
  services: ServiceData[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const { openTrialBooking } = useBooking();
  const activeService = services.find((s) => s.status === 'active');
  const comingSoonServices = services.filter((s) => s.status === 'coming-soon');

  return (
    <>
      {/* Featured Active Service */}
      {activeService && (
        <ScrollReveal variant="fadeUp" className="mb-16">
          <div className="relative bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] rounded-3xl overflow-hidden shadow-brand-lg">
            <div className="absolute inset-0 bg-noise" />
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-dots opacity-15 pointer-events-none" />
            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full border border-white/5 pointer-events-none" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/90 text-sm font-medium">Available Now</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    {activeService.name}
                  </h2>
                  <p className="text-xl text-white/80 mb-4">{activeService.tagline}</p>
                  <p className="text-white/70 leading-relaxed mb-8 max-w-lg">
                    {activeService.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={openTrialBooking}
                      size="lg"
                      className="bg-brand-yellow hover:bg-[#E6CA2F] text-gray-900 font-bold px-8 py-6 text-lg hover:shadow-warm hover:scale-105 transition-all duration-300"
                    >
                      Book Trial Walk — {activeService.price}
                    </Button>
                    <Link
                      href={`/services/${activeService.slug}`}
                      className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Key features preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.slice(0, 6).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                    >
                      <Check className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Coming Soon Services */}
      {comingSoonServices.length > 0 && (
        <div>
          <ScrollReveal variant="fadeUp" className="text-center mb-10">
            <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
              coming soon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              More Services on the Way
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoonServices.map((svc, index) => {
              const Icon = iconMap[svc.icon] || Footprints;
              const color = accentColors[index % accentColors.length];
              return (
                <motion.div key={svc.slug} variants={staggerItem}>
                  <Link href={`/services/${svc.slug}`} className="group block h-full">
                    <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col">
                      {/* Colored top bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: color }}
                      />

                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-7 h-7" style={{ color }} />
                      </div>

                      <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold mb-4 w-fit">
                        <Bell className="w-3 h-3" />
                        Coming Soon
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors mb-2">
                        {svc.name}
                      </h3>
                      <p className="text-gray-500 font-medium text-sm mb-3">{svc.tagline}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {svc.description}
                      </p>

                      <span className="inline-flex items-center text-brand-blue font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                        Get Notified
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      )}
    </>
  );
}
