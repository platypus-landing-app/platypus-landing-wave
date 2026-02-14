import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogPostBySlug, getRelatedPosts, getPublishedPosts } from '@/data/blog';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    image: `${siteUrl}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    articleSection: post.category,
    keywords: post.keywords?.join(', '),
    inLanguage: 'en-IN',
    author: {
      '@type': 'Organization',
      '@id': 'https://theplatypus.in/#organization',
      name: 'Platypus',
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

        <main className="pt-[70px] md:pt-[80px]">
          {/* Breadcrumbs */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-5xl mx-auto">
              <Breadcrumb
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.title },
                ]}
              />
            </div>
          </div>

          {/* Article Header */}
          <article className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Badge */}
              <div className="mb-6">
                <Badge className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-semibold px-4 py-1.5 text-sm">
                  {post.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info & Share */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-10 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0088FF]" />
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0088FF]" />
                  <span className="font-medium">{post.readTime}</span>
                </div>
                <ShareButton title={post.title} excerpt={post.excerpt} />
              </div>

              {/* Featured Image */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <img src={post.image} alt={post.title} className="w-full h-auto" />
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
                        className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-6 leading-tight"
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
                      className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: processedText }}
                    />
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0088FF] via-[#0077EE] to-[#0066DD] p-10 md:p-14 text-center shadow-2xl">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to Give Your Dog the Best Care?
                  </h3>
                  <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto">
                    Book a trial walk with our certified Guardians today
                  </p>
                  <BookingButton />
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-16 md:py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                  Related Articles
                </h2>
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
