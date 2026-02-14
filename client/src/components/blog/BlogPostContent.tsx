import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {post.image && (
        <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mb-6">
        <Badge variant="secondary" className="mb-4">
          {post.category}
        </Badge>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
      </div>

      <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          {post.author}
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          {post.readTime}
        </div>
      </div>

      <Separator className="mb-8" />

      <div
        className="prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
