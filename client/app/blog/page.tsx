import { Metadata } from 'next';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FeaturedBlogPost from '@/components/blog/FeaturedBlogPost';
import BlogGrid from '@/components/blog/BlogGrid';
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
        url: 'https://theplatypus.in/og-image.png',
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
    images: ['https://theplatypus.in/og-image.png'],
  },
  alternates: {
    canonical: 'https://theplatypus.in/blog',
  },
};

export default function BlogPage() {
  const blogPosts = getPublishedPosts();
  const siteUrl = 'https://theplatypus.in';

  const [featuredPost, ...remainingPosts] = blogPosts;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Platypus Blog - Dog Care Tips & Pet Health',
    description:
      'Expert advice on dog walking, pet health, and dog care from Platypus certified Guardians. Learn how to keep your pup happy and healthy.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Platypus',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    blogPost: blogPosts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
      image: `${siteUrl}${p.image}`,
      author: {
        '@type': 'Person',
        name: 'Sagar Sutaria',
      },
    })),
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
    ],
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="blog-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <Breadcrumb items={[{ label: 'Blog' }]} />

        <main className="pt-[70px] md:pt-[80px]">
          {/* Hero Section */}
          <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">expert insights</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">
                  Platypus Blog
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Expert tips on dog care, health, and happiness from our certified Guardians
                </p>
              </div>
            </div>
          </section>

          {/* Featured Post */}
          {featuredPost && (
            <section className="py-12 md:py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FeaturedBlogPost post={featuredPost} />
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          {remainingPosts.length > 0 && (
            <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#FFFCF0] to-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                  <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">keep reading</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">More Articles</h2>
                </div>
                <BlogGrid posts={remainingPosts} />
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
