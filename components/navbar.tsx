'use client';

import { Home, Users, Briefcase, Calendar, Megaphone, Menu, LogOut, User, Key } from 'lucide-react';
import { useState } from 'react';
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

      {/* Sidebar Menu */}
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </nav>
  );
}