'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const menuItems = [
    { label: 'About', href: '/about', description: 'History, Mission, Vision & Values' },
    { label: 'Membership & Registration', href: '/membership', description: 'Join ACOSA today' },
    { label: 'Projects', href: '/projects', description: 'Explore our initiatives' },
    { label: 'Annual Magazines', href: '/magazines', description: 'Read our publications' },
    { label: 'Leadership', href: '/leadership', description: 'Meet our leaders' },
    { label: 'Shop', href: '/shop', description: 'ACOSA merchandise' },
    { label: 'Dashboard', href: '/dashboard', description: 'Manage your account' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 hover:bg-secondary transition-colors border-b border-border"
            >
              <div className="font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
            </Link>
          ))}
        </nav>

        {/* Sign In at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 bg-card">
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>
      </div>


    </>
  );
}
