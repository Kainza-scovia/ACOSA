'use client';

import { Heart, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedBy: string;
  avatar: string;
  timestamp: string;
  likes: number;
  applyUrl?: string;
}

export function JobCard({
  id,
  title,
  company,
  logo,
  location,
  salary,
  type,
  description,
  postedBy,
  avatar,
  timestamp,
  likes,
  applyUrl,
}: JobCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with Company Info */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <img
              src={logo}
              alt={company}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-foreground leading-relaxed line-clamp-3">{description}</p>
      </div>

      {/* Posted by */}
      <div className="px-6 py-4 bg-secondary/30">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt={postedBy}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">Posted by {postedBy}</span>
        </div>
      </div>

      {/* Footer - Actions */}
      <div className="px-6 py-4 flex items-center justify-between">
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
          <span className="text-sm">{likeCount}</span>
        </button>
        {applyUrl ? (
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Apply Now
          </a>
        ) : (
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
