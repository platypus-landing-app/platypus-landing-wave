// src/components/blog/BlogCard.tsx

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-semibold px-3 py-1 text-xs">
                            {post.category}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-3 pt-6">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0088FF] transition-colors leading-tight line-clamp-2 mb-2">
                        {post.title}
                    </h3>
                </CardHeader>

                <CardContent className="pb-4">
                    <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
                        {post.excerpt}
                    </p>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex items-center justify-between text-sm text-gray-500 pt-4 pb-6 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0088FF] font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default BlogCard;