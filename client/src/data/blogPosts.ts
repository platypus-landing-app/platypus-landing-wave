// @deprecated — Use @/data/blog instead. This file re-exports for backward compatibility.

import {
  getPublishedPosts,
  getBlogPostBySlug as _getBlogPostBySlug,
  getRelatedPosts as _getRelatedPosts,
  type BlogPostFull,
} from './blog';

// Re-export the old BlogPost type as an alias
export type BlogPost = BlogPostFull;

// Re-export published posts as the old `blogPosts` array
export const blogPosts: BlogPost[] = getPublishedPosts();

// Re-export helpers
export const getBlogPostBySlug = _getBlogPostBySlug;

export const getRelatedPosts = (currentSlug: string, limit = 3): BlogPost[] => {
  return _getRelatedPosts(currentSlug, limit);
};
