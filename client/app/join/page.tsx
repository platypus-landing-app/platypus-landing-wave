import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import JoinHero from '@/components/join/JoinHero';
import JoinBenefits from '@/components/join/JoinBenefits';
import JoinTestimonials from '@/components/join/JoinTestimonials';
import JoinApplicationCTA from '@/components/join/JoinApplicationCTA';
import JoinFAQ from '@/components/join/JoinFAQ';

export const metadata: Metadata = {
  title: 'Dog Walker Job in Mumbai | Join Platypus as a Guardian',
  description:
    'Looking for a dog walker job in Mumbai? Join Platypus as a certified Guardian. Earn ₹15,000-30,000/month with flexible hours, free training, and insurance. Apply now.',
  keywords:
    'dog walker job mumbai, dog walking jobs mumbai, dog walker job near me, pet care jobs mumbai, dog groomer jobs mumbai, become a dog walker mumbai, Platypus careers, pet sitter jobs mumbai, dog walking vacancy mumbai',
  alternates: {
    canonical: 'https://theplatypus.in/join',
  },
  openGraph: {
    title: 'Join Platypus | Careers in Pet Care',
    description: 'Become a certified Guardian. Flexible hours, great pay, free training.',
    url: 'https://theplatypus.in/join',
    images: [{ url: 'https://theplatypus.in/hero-image.png', width: 1200, height: 630 }],
  },
};

export default function JoinPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  const jobPostingData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Dog Walker Job in Mumbai — Platypus Guardian',
    description:
      'Looking for a dog walker job in Mumbai? Join Platypus as a certified Guardian. Walk dogs across Mumbai with GPS tracking, safety protocols, and a supportive team. Earn ₹15,000-30,000/month with flexible hours.',
    datePosted: '2025-01-01',
    validThrough: '2026-12-31',
    employmentType: 'PART_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Platypus',
      sameAs: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 15000,
        maxValue: 30000,
        unitText: 'MONTH',
      },
    },
    qualifications: 'Love for animals, physical fitness, reliable transportation preferred',
    responsibilities:
      'Walk dogs safely, follow GPS tracking protocols, provide photo updates, maintain safety standards',
    skills: 'Dog handling, communication, punctuality, physical fitness',
    industry: 'Pet Care',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
  };

  return (
    <>
      <Script
        id="job-posting-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingData) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <Breadcrumb items={[{ label: 'Join Us' }]} />

        <main className="pt-[70px] md:pt-[80px]">
          <JoinHero />
          <JoinBenefits />
          <JoinTestimonials />
          <JoinFAQ />
          <JoinApplicationCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
