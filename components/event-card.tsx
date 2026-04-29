'use client';

import { Heart, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import { EventRegistrationModal } from './event-registration-modal';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  avatar: string;
  attendees: number;
  likes: number;
  timestamp: string;
  productId?: string;
}

export function EventCard({
  id,
  title,
  description,
  image,
  date,
  time,
  location,
  organizer,
  avatar,
  attendees,
  likes,
  timestamp,
  productId = `event-${id}`,
}: EventCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [registered, setRegistered] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Calculate if text needs truncation (approximate - more than 3 lines)
  const shouldTruncate = description.split('\n').length > 3 || description.length > 150;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Content - Header and Description Above Image */}
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold text-foreground flex-1">{title}</h2>
          <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">{timestamp}</span>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-foreground leading-relaxed mb-4 ${expandedDescription ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        {shouldTruncate && !expandedDescription && (
          <button
            onClick={() => setExpandedDescription(true)}
            className="text-primary hover:text-primary/80 font-semibold mb-4 transition-colors"
          >
            Read More
          </button>
        )}
        {expandedDescription && shouldTruncate && (
          <button
            onClick={() => setExpandedDescription(false)}
            className="text-primary hover:text-primary/80 font-semibold mb-4 transition-colors"
          >
            Read Less
          </button>
        )}
      </div>

      {/* Event Image */}
      {image && (
        <div className="relative aspect-video overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Action Section */}
      <div className="px-6 py-4">

        {/* Organizer */}
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <img
            src={avatar}
            alt={organizer}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">By {organizer}</span>
        </div>

        {/* Stats and Actions */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{attendees} attending</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likeCount}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                liked
                  ? 'text-red-500'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${liked ? 'fill-red-500' : ''}`}
              />
            </button>
            <button
              onClick={() => {
                if (!registered) {
                  setShowRegistration(true);
                }
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                registered
                  ? 'bg-primary/20 text-primary'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
              disabled={registered}
            >
              {registered ? 'Registered' : 'Register'}
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={showRegistration}
        eventTitle={title}
        onClose={() => {
          setShowRegistration(false);
          setRegistered(true);
        }}
      />
    </div>
  );
}
