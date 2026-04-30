'use client';

import { Home, Users, Briefcase, Calendar, Megaphone, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Sidebar({ activeTab = 'home', onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border sticky top-[calc(4rem+56px)] h-[calc(100vh-8rem)]">
        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Actions 
        <div className="border-t border-border p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-all">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>*/}
      </aside>
    </>
  );
}
