'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Card } from '@/components/ui/card';

function ProjectsContent() {
  const projects = [
    {
      id: 1,
      title: 'Community Development Initiative',
      description: 'A comprehensive program aimed at uplifting underprivileged communities through education, healthcare, and economic empowerment.',
      status: 'Active',
      impact: '5,000+ lives impacted',
    },
    {
      id: 2,
      title: 'Youth Leadership Program',
      description: 'Empowering young leaders through mentorship, training, and hands-on projects that develop their skills and confidence.',
      status: 'Active',
      impact: '500+ youths trained',
    },
    {
      id: 3,
      title: 'Alumni Scholarship Fund',
      description: 'Providing financial support to deserving students to pursue higher education and achieve their dreams.',
      status: 'Active',
      impact: '$100,000+ disbursed',
    },
    {
      id: 4,
      title: 'Environmental Sustainability',
      description: 'Promoting green initiatives and sustainable practices to protect our environment for future generations.',
      status: 'Planned',
      impact: 'Coming soon',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Our Projects</h1>
            <p className="text-muted-foreground mb-8">Explore the initiatives we're working on to create positive impact.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground pr-2">{project.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        project.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-foreground/80 text-sm mb-4">{project.description}</p>
                  <div className="text-sm font-medium text-primary">{project.impact}</div>
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

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <ProjectsContent />
    </ProtectedRoute>
  );
}
