// Blog post type definitions

export interface HowToStep {
  name: string;
  text: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  updatedDate?: string; // ISO date for dateModified schema; falls back to date if absent
  readTime: string;
  category: string;
  image: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft';
  relatedSlugs: string[];
  howToSteps?: HowToStep[]; // If present, generates HowTo schema for this post
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}
