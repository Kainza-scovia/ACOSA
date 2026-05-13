'use client';

import { Home, Users, Briefcase, Calendar, Megaphone, Menu, LogOut, User, Key } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarMenu } from '@/components/sidebar-menu';
import { useAuth } from '@/app/auth-context';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Navbar({ activeTab = 'home', onTabChange }: NavbarProps) {
  const { isLoggedIn, logout, isHydrated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav if scrolling up or at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsBottomNavVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Hide nav if scrolling down significantly
        setIsBottomNavVisible(false);
      }
      
      lastScrollY.current = currentScrollY;

      // Auto-show nav after scrolling stops
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsBottomNavVisible(true);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-sm lg:sticky lg:top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
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
          <div className="flex items-center gap-3 relative">
            {isHydrated && isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity"
                  title="User Menu"
                >
                  👤
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-semibold text-foreground">ACOSA Member</p>
                    </div>
                    
                    {/* Profile Link */}
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 text-foreground"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    
                    {/* Change Password Link */}
                    <Link
                      href="/profile/change-password"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 text-foreground"
                    >
                      <Key className="w-4 h-4" />
                      Change Password
                    </Link>
                    
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 text-foreground border-t border-border mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Menu */}
        <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </nav>

      {/* Mobile Navigation Bar - Fixed at Bottom */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border px-2 py-1 flex gap-1 bg-card transition-transform duration-300 ease-in-out ${
        isBottomNavVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all text-xs whitespace-nowrap ${
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
    </>
  );
}
