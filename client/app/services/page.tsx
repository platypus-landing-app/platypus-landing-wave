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
          <section className="relative bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-noise" />
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-dots opacity-20 pointer-events-none" />
            <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-30px] left-[-30px] w-[120px] h-[120px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <span className="font-guttery text-brand-yellow text-lg sm:text-xl mb-2 block">what we offer</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Our Services</h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Complete pet care solutions in Mumbai — from daily walks to grooming, training, and
                  pet sitting.
                </p>
              </div>
            </div>
          </section>

          {/* Services Showcase */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 right-[-60px] w-[160px] h-[160px] rounded-full border border-brand-blue/8 pointer-events-none" />
            <div className="absolute bottom-40 left-[-40px] w-[100px] h-[100px] rounded-full border border-brand-blue/5 pointer-events-none" />

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
