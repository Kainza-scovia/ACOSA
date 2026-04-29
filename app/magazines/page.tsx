'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

function MagazinesContent() {
  const magazines = [
    {
      id: 1,
      title: 'ACOSA Annual Magazine 2025',
      year: '2025',
      description: 'Celebrating achievements, stories, and innovations from our vibrant community.',
      pages: 120,
    },
    {
      id: 2,
      title: 'ACOSA Annual Magazine 2024',
      year: '2024',
      description: 'Highlighting member success stories and major initiatives of the year.',
      pages: 110,
    },
    {
      id: 3,
      title: 'ACOSA Annual Magazine 2023',
      year: '2023',
      description: 'Reflections on growth, impact, and the future of ACOSA.',
      pages: 105,
    },
    {
      id: 4,
      title: 'ACOSA Special Edition 2023',
      year: '2023',
      description: 'Special feature on community development and alumni networks.',
      pages: 80,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Annual Magazines</h1>
            <p className="text-muted-foreground mb-8">Read our latest publications and archived magazines.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {magazines.map((magazine) => (
                <Card key={magazine.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-primary uppercase">{magazine.year}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-2">{magazine.title}</h3>
                  </div>
                  <p className="text-foreground/80 text-sm mb-4">{magazine.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{magazine.pages} pages</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
}

export default function MagazinesPage() {
  return (
    <ProtectedRoute>
      <MagazinesContent />
    </ProtectedRoute>
  );
}
