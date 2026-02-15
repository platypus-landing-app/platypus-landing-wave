'use client';

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostFull } from "@/data/blog";

interface BlogCardProps {
  post: BlogPostFull;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-brand-yellow text-gray-900 font-semibold px-3 py-1 text-xs rounded-full">
              {post.category}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-3">
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm mb-4 flex-1">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center text-brand-blue font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
