'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Edit2 } from 'lucide-react';

interface ProfileHeaderProps {
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  coverImage?: string;
  profileImage?: string;
  followers?: number;
  following?: number;
  isOwn?: boolean;
}

export function ProfileHeader({
  name = 'Sarah Anderson',
  title = 'Product Manager at Tech Corp',
  bio = 'ACOSA Alumna | Tech Enthusiast | Mentor',
  location = 'San Francisco, CA',
  coverImage = 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=400&fit=crop',
  profileImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  followers = 1250,
  following = 842,
  isOwn = true,
}: ProfileHeaderProps) {
  return (
    <Card className="bg-card border border-border overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="h-40 bg-gradient-to-r from-primary/20 to-accent/20 relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6 relative">
        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-4">
          <div className="flex items-end gap-4">
            <img
              src={profileImage}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-card bg-muted"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Briefcase className="w-4 h-4" />
                {title}
              </p>
            </div>
          </div>

          {isOwn && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 sm:mt-0 flex items-center gap-2 border-border hover:bg-secondary"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Bio and Location */}
        <div className="mb-4">
          <p className="text-sm text-foreground mb-2">{bio}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 py-4 border-y border-border">
          <div>
            <div className="text-lg font-semibold text-foreground">{followers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{following.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">245</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
