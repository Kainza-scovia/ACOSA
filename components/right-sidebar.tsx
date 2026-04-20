'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export function RightSidebar() {
  const trendingTopics = [
    { id: 1, tag: '#SuccessStory', posts: 2340 },
    { id: 2, tag: '#CareerGrowth', posts: 1890 },
    { id: 3, tag: '#Alumni', posts: 1650 },
    { id: 4, tag: '#Networking', posts: 1420 },
    { id: 5, tag: '#Mentorship', posts: 1100 },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Alumni Meetup NYC', date: 'Apr 20', attendees: 128 },
    { id: 2, title: 'Career Fair 2024', date: 'May 5', attendees: 456 },
    { id: 3, title: 'Webinar: Leadership', date: 'May 12', attendees: 342 },
  ];

  return (
    <aside className="hidden xl:flex flex-col w-80 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Trending Topics */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Trending</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic.id}
              className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="font-medium text-foreground group-hover:text-primary">{topic.tag}</div>
              <div className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-4 bg-card border border-border">
        <h2 className="font-semibold text-foreground mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <div className="font-medium text-sm text-foreground">{event.title}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{event.date}</span>
                <span className="text-xs text-primary font-medium">{event.attendees} attending</span>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 bg-primary hover:bg-primary/90" size="sm">
          View All Events
        </Button>
      </Card>

      {/* About */}
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">About ACOSA</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect with thousands of alumni, explore career opportunities, and stay updated on community events.
        </p>
        <Button variant="ghost" className="text-primary" size="sm">
          Learn More →
        </Button>
      </Card>
    </aside>
  );
}
