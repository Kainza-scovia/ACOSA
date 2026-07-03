'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  author: string;
  title: string;
  avatar: string;
  role: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

export function PostCard({
  author,
  title,
  avatar,
  role,
  content,
  timestamp,
  likes,
  comments,
  shares,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full bg-muted"
          />
          <div>
            <div className="font-semibold text-foreground">{author}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {title && <h3 className="font-semibold text-foreground mb-2">{title}</h3>}
        <p className="text-sm text-foreground leading-relaxed">{content}</p>
        <div className="mt-3 text-xs text-muted-foreground">{timestamp}</div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-border flex items-center justify-around">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <Heart
            className={`w-4 h-4 transition-all ${isLiked ? 'fill-primary text-primary' : ''
              }`}
          />
          <span className="text-xs group-hover:text-primary">{likes}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs group-hover:text-primary">{comments}</span>
        </button>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
          <Share2 className="w-4 h-4" />
          <span className="text-xs group-hover:text-primary">{shares}</span>
        </button>
      </div>
    </Card>
  );
}
