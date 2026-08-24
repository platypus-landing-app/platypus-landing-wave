import type { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Platypus | India\'s Dog Walking Experts',
  description:
    'Platypus is India\'s first certified dog-walking service. We train Guardians, GPS-track every walk, and carry strict safety protocols. Mumbai-born, parent-focused.',
  alternates: { canonical: 'https://www.theplatypus.in/about' },
  openGraph: {
    title: 'About Platypus | India\'s Dog Walking Experts',
    description:
      'Platypus is India\'s first certified dog-walking service. Mumbai-born, parent-focused, built with trained Guardians and live GPS tracking.',
    url: 'https://www.theplatypus.in/about',
    images: [
      {
        url: 'https://www.theplatypus.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Platypus - India\'s Dog Walking Experts',
      },
    ],
  },
};

export default function AboutPage() {
  const siteUrl = 'https://www.theplatypus.in';

  // BreadcrumbList schema as static JSON. Using next/script with JSON.stringify
  // is Next.js's documented way to inject JSON-LD; content is compile-time static.
  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'About', item: siteUrl + '/about' },
    ],
  });

  const pillars = [
    {
      title: 'Trained Guardians',
      body: 'Every walker clears our in-house certification — safety, behaviour, first-aid, leash handling. No one walks your dog without it.',
    },
    {
      title: 'Live GPS on every walk',
      body: 'You see the route, pace, and location in real time. No guessing, no "I promise we walked them."',
    },
    {
      title: 'Parent-focused process',
      body: 'Trial walk, consistent Guardian, flexible plans, post-walk report card. Built around how Mumbai pet parents actually live.',
    },
  ];

  return (
    <>
      <Script
        id="about-breadcrumb"
        type="application/ld+json"
      >
        {breadcrumbJson}
      </Script>

      <div className="min-h-screen bg-white">
        <Navigation />
        <Breadcrumb items={[{ label: 'About' }]} />

        <main id="main-content" className="pt-[70px] md:pt-[80px]">
          {/* Hero */}
          <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                our story
              </span>
              <h1 className="font-domine font-bold text-gray-900 text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.12] mb-6">
                About Platypus
              </h1>
              <p className="text-[18px] sm:text-[20px] text-gray-700 leading-relaxed max-w-2xl">
                Platypus is India&apos;s first certified dog-walking service. We train
                Guardians, GPS-track every walk, and run strict safety protocols — because
                walking a dog you love should not require a leap of faith.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                  why we exist
                </span>
                <h2 className="font-domine font-bold text-gray-900 text-3xl md:text-4xl mb-6">
                  Be their human.
                </h2>
                <div className="space-y-5 text-gray-700 text-[17px] leading-[1.75]">
                  <p>
                    Indian cities are busy. Dogs still need to move, sniff, meet the world,
                    and get tired. The people who love them often can&apos;t make every
                    single walk happen, every single day — and informal options rarely
                    pass the only test that matters: would you trust this person alone
                    with your dog?
                  </p>
                  <p>
                    We built Platypus to be that person. A certified Guardian you
                    recognise on sight, assigned to your dog on a schedule you control,
                    with a live GPS trail you can open on your phone any time.
                  </p>
                  <p>
                    We started in Mumbai in 2024. Today we serve 16 areas across the city
                    and walk hundreds of dogs every week.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFCF0] to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                  what we stand for
                </span>
                <h2 className="font-domine font-bold text-gray-900 text-3xl md:text-4xl mb-4">
                  Three things we will not compromise
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 text-xl mb-2">{p.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Founder */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                who&apos;s behind it
              </span>
              <h2 className="font-domine font-bold text-gray-900 text-3xl md:text-4xl mb-6">
                Built by a pet parent, for pet parents
              </h2>
              <div className="space-y-5 text-gray-700 text-[17px] leading-[1.75] max-w-3xl">
                <p>
                  Platypus is built by Sagar Sutaria. The company behind it is{' '}
                  <span className="font-medium text-gray-900">
                    Third Planet Solutions Private Limited
                  </span>
                  , registered in Mumbai. Every decision — from who we hire as a Guardian
                  to how a walk gets priced — is made in the room where the dog lives.
                </p>
                <p>
                  Our team is small on purpose. A close group of Guardians, trainers, and
                  a support line you can actually reach.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-gradient-to-br from-[#247AFD] to-[#1A5BC4] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-noise" />
                <div className="relative z-10">
                  <h3 className="font-domine font-bold text-white text-3xl md:text-4xl mb-4">
                    Interested in walks for your dog?
                  </h3>
                  <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                    We&apos;re onboarding pet parents in Mumbai. Register your interest
                    and we&apos;ll reach out when we have a Guardian for your area.
                  </p>
                  <a
                    href="https://wa.me/918451880963?text=Hi%20Platypus!%20I'd%20like%20to%20register%20my%20interest%20in%20dog%20walking%20for%20my%20dog."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-brand-yellow text-gray-900 font-bold text-[16px] hover:bg-[#E6CA2F] transition-colors"
                  >
                    Register your interest
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
