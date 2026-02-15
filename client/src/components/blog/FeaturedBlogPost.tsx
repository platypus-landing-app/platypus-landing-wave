'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { BlogPostFull } from '@/data/blog';

interface FeaturedBlogPostProps {
  post: BlogPostFull;
}

export default function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollReveal variant="fadeUp">
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-brand-lg transition-all duration-300 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/5" />
              <div className="absolute top-5 left-5">
                <span className="inline-block bg-brand-yellow text-gray-900 font-bold px-4 py-1.5 text-sm rounded-full">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
              <span className="text-brand-blue font-semibold text-sm uppercase tracking-wide mb-3">
                Featured Article
              </span>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors leading-tight mb-4">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base lg:text-lg mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <span className="inline-flex items-center text-brand-blue font-bold text-base group-hover:gap-3 gap-2 transition-all">
                Read Article
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}
