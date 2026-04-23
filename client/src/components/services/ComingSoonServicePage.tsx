'use client';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Check, Bell } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import { motion } from 'framer-motion';
import type { ServiceData } from '@/data/services';
import EmailCapture from './EmailCapture';

interface ComingSoonServicePageProps {
  service: ServiceData;
}

export default function ComingSoonServicePage({ service }: ComingSoonServicePageProps) {
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
        {/* Hero — warm cream canvas, brand-blue accent. */}
        <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-brand-blue/20 rounded-full text-brand-blue font-semibold text-sm mb-6 shadow-sm">
                <Bell className="w-4 h-4" />
                Coming soon
              </div>
              <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">our next service</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">
                {service.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {service.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Description + Email */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="fadeUp">
              <p className="text-lg text-gray-700 leading-relaxed mb-10">{service.description}</p>

              <div className="bg-gradient-to-br from-[#FFFCF0] to-[#FFF8E7] rounded-2xl p-8 border border-brand-yellow/15 relative overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Be the first to know when we launch
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your email and we&apos;ll notify you as soon as {service.name} is available.
                </p>
                <EmailCapture serviceName={service.name} serviceSlug={service.slug} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFCF0] to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-12">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">what&apos;s planned</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  What to Expect
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {service.features.map((feature, index) => {
                const colors = ['#247AFD', '#69D84F', '#C071FE', '#FFE135'];
                const color = colors[index % colors.length];
                return (
                  <motion.div
                    key={feature}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Check className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-gray-700 text-base font-medium pt-1.5">{feature}</span>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
