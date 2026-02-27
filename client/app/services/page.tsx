import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ServicesShowcase from '@/components/services/ServicesShowcase';
import { services } from '@/data/services';

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
          <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">what we offer</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">Our Services</h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Complete pet care solutions in Mumbai — from daily walks to grooming, training, and
                  pet sitting.
                </p>
              </div>
            </div>
          </section>

          {/* Services Showcase */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ServicesShowcase services={serviceList} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
