'use client';

import { Bell, Home, Users, Briefcase, Calendar, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { AuthModal } from '@/components/auth-modal';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Navbar({ activeTab = 'home', onTabChange }: NavbarProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'announcements', label: 'Announce', icon: Megaphone },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/acosa-logo.jpg"
            alt="ACOSA Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </div>

        {/* Spacer for desktop layout */}
        <div className="hidden md:flex flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="relative hidden sm:block p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          <Button 
            variant="ghost" 
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setAuthModalOpen(true)}
          >
            Sign In
          </Button>

          <Button 
            variant="default"
            size="sm"
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90"
            onClick={() => setAuthModalOpen(true)}
          >
            Join
          </Button>

          {/* Mobile Sign In Button */}
          <Button 
            size="sm"
            className="lg:hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => setAuthModalOpen(true)}
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-border px-2 py-1 flex overflow-x-auto gap-1 bg-card">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all text-xs whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>



      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
}
