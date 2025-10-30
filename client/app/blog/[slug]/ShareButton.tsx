'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  excerpt: string;
}

export default function ShareButton({ title, excerpt }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 ml-auto hover:text-[#0088FF] transition-colors font-medium"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </button>
  );
}
