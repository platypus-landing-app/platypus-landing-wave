'use client';

import { motion } from 'framer-motion';
import StaggerContainer, { staggerItem } from '@/components/ui/StaggerContainer';
import BlogCard from './BlogCard';
import type { BlogPostFull } from '@/data/blog';

interface BlogGridProps {
  posts: BlogPostFull[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <motion.div key={post.slug} variants={staggerItem}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </StaggerContainer>
  );
}
