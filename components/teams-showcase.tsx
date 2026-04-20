'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  class?: string;
  color: string;
  logo: string;
  members: number;
  description: string;
}

const teams: Team[] = [
  {
    id: 'class-2015',
    name: 'ACOSA Class of 2015',
    class: '2015',
    color: 'bg-blue-600',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.15.17%20PM%20%281%29-vwHdREYwRbSczDLeDf4JCkZjeWzOvw.jpeg',
    members: 28,
    description: 'Founding Legacy - Pride & Excellence',
  },
  {
    id: 'class-2018',
    name: 'ACOSA Class of 2018',
    class: '2018',
    color: 'bg-yellow-600',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.37.32%20PM-1KzbgYKbUKCko4jzzTCdnXGvpioBv5.jpeg',
    members: 18,
    description: 'White & Gold - Experience & Excellence',
  },
  {
    id: 'class-2017',
    name: 'ACOSA Class of 2017',
    class: '2017',
    color: 'bg-red-600',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.37.31%20PM%20%282%29-usiOxcxBMwJXi1mpfc3ZBgj4O0FXe7.jpeg',
    members: 24,
    description: 'Red & White - Passion & Dedication',
  },
  {
    id: 'class-2020',
    name: 'ACOSA Class of 2020',
    class: '2020',
    color: 'bg-blue-700',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.37.31%20PM-YlDt4bzkATCoGhOKZ2MeJUv6L2gH10.jpeg',
    members: 25,
    description: 'Blue Legacy - Champions United',
  },
  {
    id: 'class-2023',
    name: 'ACOSA Class of 2023',
    class: '2023',
    color: 'bg-red-700',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.37.30%20PM%20%282%29-MoGP0lFCCz6GKcSkW7qnT9BC3TuBGN.jpeg',
    members: 22,
    description: 'Red & Black - Rising Stars',
  },
  {
    id: 'class-2025',
    name: 'ACOSA Class of 2025',
    class: '2025',
    color: 'bg-pink-500',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.37.30%20PM%20%281%29-3v8BxzAPGzF5AxQA6m6BHrkOmg6M7d.jpeg',
    members: 20,
    description: 'Pink Team - Celebration & Unity',
  },
];

export function TeamsShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full bg-gradient-to-b from-background via-primary/5 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">ACOSA First Edition Launch</h2>
          <p className="text-lg text-muted-foreground">Different Teams, unified spirit</p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="group rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Team Image */}
              <div
                className="relative h-64 overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => setSelectedImage(team.logo)}
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay Badge */}
                <div className={`absolute top-3 right-3 ${team.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {team.class || 'Alumni'}
                </div>
              </div>

              {/* Team Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{team.description}</p>

                {/* Members Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {team.members} Members
                  </span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${team.color} opacity-70`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 z-51 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Image */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
