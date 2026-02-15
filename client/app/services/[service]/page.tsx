import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import ActiveServicePage from '@/components/services/ActiveServicePage';
import ComingSoonServicePage from '@/components/services/ComingSoonServicePage';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service } = await params;
  const svc = getServiceBySlug(service);

  if (!svc) {
    return { title: 'Service Not Found | Platypus' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  return {
    title: `${svc.name} Service in Mumbai | Platypus`,
    description: svc.metaDescription,
    keywords: svc.keywords.join(', '),
    alternates: {
      canonical: `${siteUrl}/services/${svc.slug}`,
    },
    openGraph: {
      title: `${svc.name} Service in Mumbai | Platypus`,
      description: svc.metaDescription,
      url: `${siteUrl}/services/${svc.slug}`,
      images: [{ url: `${siteUrl}${svc.image}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;
  const svc = getServiceBySlug(service);

  if (!svc) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${svc.name} Service in Mumbai`,
    description: svc.description,
    url: `${siteUrl}/services/${svc.slug}`,
    image: `${siteUrl}${svc.image}`,
    provider: {
      '@type': 'Organization',
      '@id': 'https://theplatypus.in/#organization',
      name: 'Platypus',
      url: siteUrl,
    },
    areaServed: [
      { '@type': 'City', name: 'Mumbai', containedInPlace: { '@type': 'State', name: 'Maharashtra' } },
      { '@type': 'City', name: 'Thane', containedInPlace: { '@type': 'State', name: 'Maharashtra' } },
      { '@type': 'City', name: 'Navi Mumbai', containedInPlace: { '@type': 'State', name: 'Maharashtra' } },
    ],
    serviceType: svc.name,
    ...(svc.status === 'active' && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '127',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${svc.name} Plans`,
        itemListElement: [
          { '@type': 'Offer', name: 'Trial Walk', price: '199', priceCurrency: 'INR', description: 'Single trial walk with a certified Guardian' },
          { '@type': 'Offer', name: 'Experience Pack', price: '399', priceCurrency: 'INR', description: '2 walks to experience our service' },
          { '@type': 'Offer', name: 'Monthly Once Daily', price: '4680', priceCurrency: 'INR', description: 'Once-a-day walks for a full month' },
          { '@type': 'Offer', name: 'Monthly Twice Daily', price: '7800', priceCurrency: 'INR', description: 'Twice-a-day walks for a full month' },
        ],
      },
    }),
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: svc.name, item: `${siteUrl}/services/${svc.slug}` },
    ],
  };

  return (
    <>
      <Script
        id="service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="service-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {svc.status === 'active' ? (
        <ActiveServicePage service={svc} />
      ) : (
        <ComingSoonServicePage service={svc} />
      )}
    </>
  );
}
