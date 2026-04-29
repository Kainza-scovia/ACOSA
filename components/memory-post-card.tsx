'use client';

import { Heart, MessageCircle, Share2, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { ImageLightbox } from '@/components/image-lightbox';

interface MemoryPostCardProps {
  id: number;
  title: string;
  description: string;
  eventName: string;
  date: string;
  location: string;
  images: string[];
  author: string;
  avatar: string;
  role: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export function MemoryPostCard({
  id,
  title,
  description,
  eventName,
  date,
  location,
  images,
  author,
  avatar,
  role,
  likes,
  comments,
  shares,
  timestamp,
}: MemoryPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Calculate if text needs truncation (approximate - more than 3 lines)
  const shouldTruncate = description.split('\n').length > 3 || description.length > 150;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-foreground">{author}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{timestamp}</span>
        </div>

        <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
        
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{eventName} • {date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Description - Above Images */}
      <div className="px-6 py-4">
        <p className={`text-foreground leading-relaxed ${expandedDescription ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        {shouldTruncate && !expandedDescription && (
          <button
            onClick={() => setExpandedDescription(true)}
            className="text-primary hover:text-primary/80 font-semibold mt-2 transition-colors"
          >
            Read More
          </button>
        )}
        {expandedDescription && shouldTruncate && (
          <button
            onClick={() => setExpandedDescription(false)}
            className="text-primary hover:text-primary/80 font-semibold mt-2 transition-colors"
          >
            Read Less
          </button>
        )}
      </div>

      {/* Images Grid - Facebook Style */}
      {images.length > 0 && (
        <div className="bg-muted">
          {images.length === 1 ? (
            // Single image - full width
            <div
              className="relative aspect-video overflow-hidden bg-gray-200 cursor-pointer group"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
            >
              <img
                src={images[0]}
                alt="Memory 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : images.length === 2 ? (
            // Two images - side by side
            <div className="grid grid-cols-2 gap-1">
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden bg-gray-200 cursor-pointer group"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : images.length === 3 ? (
            // Three images - one large, two small
            <div className="grid grid-cols-2 gap-1">
              <div
                className="relative row-span-2 aspect-auto overflow-hidden bg-gray-200 cursor-pointer group"
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={images[0]}
                  alt="Memory 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="relative aspect-square overflow-hidden bg-gray-200 cursor-pointer group"
                onClick={() => {
                  setLightboxIndex(1);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={images[1]}
                  alt="Memory 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="relative aspect-square overflow-hidden bg-gray-200 cursor-pointer group"
                onClick={() => {
                  setLightboxIndex(2);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={images[2]}
                  alt="Memory 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ) : (
            // Four or more images - Facebook style 2x2 grid
            <div className="grid grid-cols-2 gap-1">
              {images.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden bg-gray-200 cursor-pointer group"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {idx === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                      <span className="text-white text-3xl font-bold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Footer - Actions */}
      <div className="px-6 py-4 border-t border-border">
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
