'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Smile, Send } from 'lucide-react';
import { useState } from 'react';

export function CreatePostCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-card border border-border shadow-sm mb-6">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            onClick={() => setIsExpanded(true)}
            className="flex-1 bg-secondary border-0 rounded-full px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:bg-secondary/80 transition-colors cursor-pointer"
            readOnly
          />
        </div>

        {/* Expanded Input */}
        {isExpanded && (
          <div className="space-y-4 border-t border-border pt-4">
            <textarea
              placeholder="What's on your mind?"
              className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              rows={4}
            />

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-primary">
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Actions */}
        {!isExpanded && (
          <div className="flex items-center justify-around pt-2 border-t border-border">
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors text-sm">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors text-sm">
              <Smile className="w-4 h-4" />
              <span className="hidden sm:inline">Feeling</span>
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
