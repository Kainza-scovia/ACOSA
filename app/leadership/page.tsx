'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

function LeadershipContent() {
  const leaders = [
    {
      id: 1,
      name: 'Dr. John Kamau',
      position: 'President',
      bio: 'Visionary leader with 15 years of experience in community development.',
      email: 'john@acosa.org',
      phone: '+254 (0) 123 456 789',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Sarah Mwangi',
      position: 'Vice President',
      bio: 'Strategic thinker focused on alumni engagement and growth initiatives.',
      email: 'sarah@acosa.org',
      phone: '+254 (0) 123 456 790',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Michael Ochieng',
      position: 'Treasurer',
      bio: 'Finance expert ensuring sustainable organizational growth.',
      email: 'michael@acosa.org',
      phone: '+254 (0) 123 456 791',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      name: 'Grace Njeri',
      position: 'Secretary General',
      bio: 'Dedicated to fostering communication and collaboration within ACOSA.',
      email: 'grace@acosa.org',
      phone: '+254 (0) 123 456 792',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Leadership</h1>
            <p className="text-muted-foreground mb-8">Meet the dedicated leaders steering ACOSA towards excellence.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {leaders.map((leader) => (
                <Card key={leader.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4 mb-4">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{leader.name}</h3>
                      <p className="text-primary font-medium text-sm">{leader.position}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 text-sm mb-4">{leader.bio}</p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {leader.email}
                    </a>
                    <a
                      href={`tel:${leader.phone}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {leader.phone}
                    </a>
                  </div>
                </Card>
              ))}
            </div>

            {/* Official Message Section */}
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">President&apos;s Official Message</h2>
              <p className="text-foreground/80 leading-relaxed">
                Dear ACOSA family, we are committed to building a stronger, more inclusive community where every member can thrive and contribute meaningfully. Together, we will continue to create positive impact and shape a brighter future for generations to come. Thank you for your unwavering support and dedication to our mission.
              </p>
            </div>
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <ProtectedRoute>
      <LeadershipContent />
    </ProtectedRoute>
  );
}
