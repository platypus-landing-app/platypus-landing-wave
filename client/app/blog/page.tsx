import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getPublishedPosts } from '@/data/blog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dog Care & Pet Health Blog | Platypus Expert Tips',
  description:
    'Expert dog care tips, pet health advice, and dog walking insights from Platypus certified Guardians. Learn how to keep your dog happy, healthy, and active.',
  keywords:
    'dog care tips, pet health blog, dog walking advice, dog behavior, pet wellness, Mumbai dog care',
  openGraph: {
    type: 'website',
    url: 'https://theplatypus.in/blog',
    title: 'Dog Care & Pet Health Blog | Platypus Expert Tips',
    description: 'Expert dog care tips and pet health advice from Platypus certified Guardians.',
    images: [
      {
        url: 'https://theplatypus.in/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Platypus Dog Care Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Care & Pet Health Blog | Platypus',
    description: 'Expert dog care tips from Platypus certified Guardians.',
    images: ['https://theplatypus.in/hero-image.png'],
  },
  alternates: {
    canonical: 'https://theplatypus.in/blog',
  },
};

export default function BlogPage() {
  const blogPosts = getPublishedPosts();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Platypus Blog - Dog Care Tips & Pet Health',
    description:
      'Expert advice on dog walking, pet health, and dog care from Platypus certified Guardians. Learn how to keep your pup happy and healthy.',
    url: 'https://theplatypus.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Platypus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theplatypus.in/logo.png',
      },
    },
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <Breadcrumb items={[{ label: 'Blog' }]} />

        <main className="pt-[70px] md:pt-[80px]">
          {/* Hero Section - Matching landing page style */}
          <section className="relative bg-gradient-to-br from-[#0088FF] via-[#0077EE] to-[#0066DD] text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Platypus Blog
                </h1>
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
                  Expert tips on dog care, health, and happiness from our certified Guardians
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
                  {blogPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-xl">
                    No blog posts available yet. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
