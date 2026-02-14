// Blog post type definitions

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft';
  relatedSlugs: string[];
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
}
