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
    name: svc.name,
    description: svc.description,
    url: `${siteUrl}/services/${svc.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Platypus',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Mumbai',
    },
    ...(svc.price && { offers: { '@type': 'Offer', price: '199', priceCurrency: 'INR' } }),
  };

  return (
    <>
      <Script
        id="service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {svc.status === 'active' ? (
        <ActiveServicePage service={svc} />
      ) : (
        <ComingSoonServicePage service={svc} />
      )}
    </>
  );
}
