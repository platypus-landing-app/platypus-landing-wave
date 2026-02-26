import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogPostBySlug, getRelatedPosts, getPublishedPosts } from '@/data/blog';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ShareButton from './ShareButton';
import BookingButton from './BookingButton';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

// Generate static params for all blog posts
export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Platypus',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landing.theplatypus.in';

  return {
    title: `${post.title} | Platypus Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      images: [
        {
          url: `${siteUrl}${post.image}`,
          secureUrl: `${siteUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'Platypus',
      locale: 'en_IN',
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [`${siteUrl}${post.image}`],
      site: '@platypus_bth',
      creator: '@platypus_bth',
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);

  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Parse content into proper sections
  const contentSections = post.content
    .trim()
    .split('\n\n')
    .filter((section) => section.trim() !== '');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://landing.theplatypus.in';

  const wordCount = post.content.trim().split(/\s+/).length;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${post.image}`,
      width: 1200,
      height: 750,
      caption: post.title,
    },
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    wordCount,
    articleSection: post.category,
    keywords: post.keywords?.join(', '),
    inLanguage: 'en-IN',
    author: {
      '@type': 'Person',
      name: 'Sagar Sutaria',
      jobTitle: 'Founder',
      url: 'https://www.linkedin.com/in/sagar-sutaria/',
      worksFor: { '@id': 'https://theplatypus.in/#organization' },
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://theplatypus.in/#organization',
      name: 'Platypus',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://theplatypus.in/#website',
    },
    about: {
      '@type': 'Thing',
      name: post.category,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.prose h2', '.prose p:first-of-type'],
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  // HowTo schema for posts with step-by-step instructions
  const howToData = post.howToSteps && post.howToSteps.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.metaDescription || post.excerpt,
        image: `${siteUrl}${post.image}`,
        step: post.howToSteps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

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
      {howToData && (
        <Script
          id="blog-howto-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
        />
      )}

      <div className="min-h-screen bg-white">
        <Navigation />

        <main className="pt-[70px] md:pt-[80px]">
          {/* Hero Image */}
          <div className="relative w-full max-h-[60vh] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Back to blog */}
            <div className="absolute top-6 left-0 right-0 z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div>
            </div>

            {/* Category + Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-10">
                <span className="inline-block bg-brand-yellow text-gray-900 font-semibold px-4 py-1.5 text-sm rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Article */}
          <article className="py-10 md:py-14">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm mb-10 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-blue" />
                  <a href="https://www.linkedin.com/in/sagar-sutaria/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-brand-blue transition-colors">{post.author}</a>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500">Founder, Platypus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-blue" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-blue" />
                  <span>{post.readTime}</span>
                </div>
                <ShareButton title={post.title} excerpt={post.excerpt} />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {contentSections.map((section, index) => {
                  const trimmedSection = section.trim();

                  // Handle H2 headings
                  if (trimmedSection.startsWith('## ')) {
                    return (
                      <h2
                        key={index}
                        className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-5 leading-tight"
                      >
                        {trimmedSection.substring(3)}
                      </h2>
                    );
                  }

                  // Handle paragraphs with bold text
                  const processedText = trimmedSection.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-bold text-gray-900">$1</strong>'
                  );

                  return (
                    <p
                      key={index}
                      className="text-lg text-gray-700 leading-[1.8] mb-6"
                      dangerouslySetInnerHTML={{ __html: processedText }}
                    />
                  );
                })}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-[#F0F6FF] text-brand-blue text-sm font-medium px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#247AFD] via-[#1F6AE0] to-[#1A5BC4] p-10 md:p-14 text-center shadow-2xl">
                <div className="absolute inset-0 bg-noise" />
                <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <span className="font-guttery text-brand-yellow text-lg sm:text-xl mb-3 block">try it out</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to Give Your Dog the Best Care?
                  </h3>
                  <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Book a trial walk with our certified Guardians today
                  </p>
                  <BookingButton />
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-16 md:py-20 bg-gradient-to-b from-[#F8FAFF] to-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-dots opacity-20 pointer-events-none" />
              <div className="absolute bottom-10 left-[-40px] w-[100px] h-[100px] rounded-full border border-brand-blue/8 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                  <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">keep reading</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Related Articles
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
