'use client';

import { Heart, MessageCircle, Share2, Star } from 'lucide-react';
import { useState } from 'react';

interface TestimonyCardProps {
  id: number;
  author: string;
  avatar: string;
  role: string;
  company: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  rating?: number;
}

export function TestimonyCard({
  id,
  author,
  avatar,
  role,
  company,
  title,
  content,
  timestamp,
  likes,
  comments,
  shares,
  rating = 5,
}: TestimonyCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [expandedContent, setExpandedContent] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Calculate if text needs truncation (approximate - more than 3 lines)
  const shouldTruncate = content.split('\n').length > 3 || content.length > 150;

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-foreground">{author}</h3>
            <p className="text-sm text-muted-foreground">{role} at {company}</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{timestamp}</span>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>

      {/* Content */}
      <p className={`text-foreground leading-relaxed mb-4 ${expandedContent ? '' : 'line-clamp-3'}`}>
        {content}
      </p>
      {shouldTruncate && !expandedContent && (
        <button
          onClick={() => setExpandedContent(true)}
          className="text-primary hover:text-primary/80 font-semibold mb-4 transition-colors"
        >
          Read More
        </button>
      )}
      {expandedContent && shouldTruncate && (
        <button
          onClick={() => setExpandedContent(false)}
          className="text-primary hover:text-primary/80 font-semibold mb-4 transition-colors"
        >
          Read Less
        </button>
      )}

      {/* Footer - Actions */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{likeCount} Likes</span>
          <span>{comments} Comments • {shares} Shares</span>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              liked
                ? 'text-red-500'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Heart
              className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`}
            />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:bg-secondary px-4 py-2 rounded-lg transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:bg-secondary px-4 py-2 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
