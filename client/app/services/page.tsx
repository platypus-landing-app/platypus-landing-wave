import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { services } from '@/data/services';
import { Footprints, Scissors, GraduationCap, Home, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  Scissors,
  GraduationCap,
  Home,
};

export const metadata: Metadata = {
  title: 'Pet Care Services in Mumbai | Dog Walking, Grooming & More | Platypus',
  description:
    'Professional pet care services in Mumbai by Platypus. Dog walking with certified Guardians, grooming, training, and pet sitting. Book a trial walk today.',
  keywords:
    'pet care services Mumbai, dog walking Mumbai, dog grooming Mumbai, dog training Mumbai, pet sitting Mumbai',
  alternates: {
    canonical: 'https://theplatypus.in/services',
  },
  openGraph: {
    title: 'Pet Care Services in Mumbai | Platypus',
    description: 'Professional dog walking, grooming, training, and pet sitting services in Mumbai.',
    url: 'https://theplatypus.in/services',
    images: [{ url: 'https://theplatypus.in/og-image.png', width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  const serviceList = Object.values(services);

  const siteUrl = 'https://theplatypus.in';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Platypus Pet Care Services',
    description: 'Professional pet care services in Mumbai',
    itemListElement: serviceList.map((svc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: svc.name,
        description: svc.description,
        url: `${siteUrl}/services/${svc.slug}`,
        provider: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'Platypus',
        },
      },
    })),
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
    ],
  };

  return (
    <>
      <Script
        id="services-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="services-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <Breadcrumb items={[{ label: 'Services' }]} />

        <main className="pt-[70px] md:pt-[80px]">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-[#0088FF] via-[#0077EE] to-[#0066DD] text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Our Services</h1>
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
                  Complete pet care solutions in Mumbai — from daily walks to grooming, training, and
                  pet sitting.
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {serviceList.map((svc) => {
                  const Icon = iconMap[svc.icon] || Footprints;
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <Icon className="w-7 h-7 text-[#0088FF]" />
                          </div>
                          {svc.status === 'coming-soon' && (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              Coming Soon
                            </Badge>
                          )}
                          {svc.status === 'active' && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Available
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#0088FF] transition-colors">
                          {svc.name}
                        </h2>
                        <p className="text-gray-500 font-medium mb-3">{svc.tagline}</p>
                        <p className="text-gray-600 leading-relaxed flex-1">{svc.description}</p>
                        <div className="mt-6 flex items-center text-[#0088FF] font-semibold">
                          {svc.status === 'active' ? 'Learn More' : 'Get Notified'}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
