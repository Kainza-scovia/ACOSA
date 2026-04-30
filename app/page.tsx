'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { TeamsShowcase } from '@/components/teams-showcase';
import { MemoryPostCard } from '@/components/memory-post-card';
import { TestimonyCard } from '@/components/testimony-card';
import { JobCard } from '@/components/job-card';
import { EventCard } from '@/components/event-card';

function HomeContent() {
  const [activeTab, setActiveTab] = useState('home');

  const memoryPosts = [
    {
      id: 1,
      title: 'ACOSA Sports Tournament Finals - Victory & Community Spirit',
      description: 'What an incredible day celebrating ACOSA athleticism and community engagement! Hundreds of fans gathered to support our teams in this thrilling finals match. The energy, passion, and sportsmanship displayed by all participants truly embodied the ACOSA spirit. Special thanks to all our supporters and volunteers!',
      eventName: 'Sports Tournament Finals',
      date: 'April 4, 2026',
      location: 'ACOSA Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9461.jpg-r30pUKHuHSWK8Jkau45YawGcyxmn9i.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9606.jpg-XW0KGZX8NokR7TkfTuCIP9t28oKXXp.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9492.jpg-1lQlg0EqpXjlrcZFukjeDQzXcRYhUo.jpeg',
      ],
      author: 'Maraka Ben',
      avatar: '/acosa-badge.jpg',
      role: 'Event Coordinator, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 2,
      title: 'Championship Celebration - ACOSA Team Triumphs!',
      description: 'Celebrating our championship victory with the incredible ACOSA team! The dedication, teamwork, and resilience shown throughout the season have paid off. From intense matches to unforgettable moments on the pitch, this journey has been amazing. Here\'s to the champions and everyone who supported us!',
      eventName: 'Championship Victory',
      date: 'April 4, 2026',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9448.jpg-rWguQhnMcootvH1iERHKJA3h2jIaMA.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9607.jpg%20%281%29-7LNFY85auCexQkacwmuMbfga278USV.jpeg',
      ],
      author: 'Okello George',
      avatar: '/acosa-badge.jpg',
      role: 'Team Captain, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 3,
      title: 'Match Day Magic - ACOSA Players in Action',
      description: 'What a spectacular day of football! Our ACOSA athletes displayed exceptional skill, determination, and sportsmanship on the field. Every match was filled with excitement, great plays, and moments that will stay with us forever. Hats off to all the players, referees, and fans who made this day unforgettable.',
      eventName: 'Inter-School Tournament',
      date: 'April 4, 2026',
      location: 'Regional Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9432.jpg-Tk9iRDKfLyNccC5Z0wkHa53ps7Wzb2.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9447.jpg-nhEshweNiVIZiB3nl79Tvsa9AdvlNQ.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9439.jpg-qLFKZl5AtubRDx5lRnqZQfeNdNdkry.jpeg',
      ],
      author: 'Amuge Joan',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Director, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 4,
      title: 'Team Photo Day at the Stadium - Class of 2018',
      description: 'What an honor to gather with the incredible Class of 2018 for an official team photo! This group represents the best of ACOSA values - unity, excellence, and pride. Standing together in our official jerseys, we remembered the bonds we\'ve built.',
      eventName: 'Class of 2018 Team Photo',
      date: 'April 4, 2026',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.45.33%20PM-fAySHGBsvAOUIbswAdWBnR0FFCWiBy.jpeg',
      ],
      author: 'Norah Mwima',
      avatar: '/acosa-badge.jpg',
      role: 'Class Secretary, Class of 2018',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 5,
      title: 'Final Celebration - ACOSA United in Victory',
      description: 'The final whistle blew and our ACOSA teams rushed to celebrate together! This moment captured the true spirit of our community - diverse teams, united purpose, celebrating each other\'s victories.',
      eventName: 'Championship Finals Celebration',
      date: 'April 4, 2026',
      location: 'ACOSA Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9487.jpg-TFLvvq6xRUg4xQ0sosJ2Q83zZkmscI.jpeg',
      ],
      author: 'Mrs. Kamwada',
      avatar: '/acosa-badge.jpg',
      role: 'Event Organizer, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 6,
      title: 'Team Bonding & Reflection - ACOSA Football Family',
      description: 'After an intense match, our ACOSA team gathered on the field to reflect, recharge, and strengthen the bonds that make us more than just players. These quiet moments together build lasting friendships.',
      eventName: 'Post-Match Team Bonding',
      date: 'April 4, 2026',
      location: 'Regional Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9501.jpg%20%282%29-k256QH5fSrx83MZ4WLKwRjMJhXOzwR.jpeg',
      ],
      author: 'Shaggy Shadrach',
      avatar: '/acosa-badge.jpg',
      role: 'Team Lead, ACOSA Sports',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 7,
      title: 'Class of 2022 Champions - Blue Team Glory',
      description: 'Our Class of 2022 represented ACOSA with pride and excellence on the field! In our distinctive blue jerseys, we showcased teamwork, determination, and the true spirit of ACOSA athletics.',
      eventName: 'Class of 2022 Tournament',
      date: 'April 4, 2026',
      location: 'ACOSA Athletic Grounds',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%201.26.19%20PM-HJWjPPJolEIgPughXJOWSKbUynSi9e.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%204.50.46%20PM-Du39taU9lWqkjFM1P56rgaWqhneZXx.jpeg',
      ],
      author: 'Opolot Paul',
      avatar: '/acosa-badge.jpg',
      role: 'Class Captain, Class of 2022',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 8,
      title: 'Class of 2023 Rising Stars - Red Team Energy',
      description: 'The Class of 2023 brought fresh energy and unstoppable momentum to ACOSA athletics! Wearing our vibrant red jerseys with pride, we proved that we\'re here now, making our mark.',
      eventName: 'Class of 2023 Season Highlights',
      date: 'April 4, 2026',
      location: 'ACOSA Athletic Grounds',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.22%20PM-oSilnIFwRbmd3Hl4LyS4slMgKIMXTk.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.25%20PM-pQMTyefKBQm0wey9DZqA9BgkMTsuDI.jpeg',
      ],
      author: 'Okiror Domenic',
      avatar: '/acosa-badge.jpg',
      role: 'Team Representative, Class of 2023',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 9,
      title: 'ACOSA Alumni Showcase - Classes United',
      description: 'What an incredible gathering of ACOSA alumni and current teams! Classes of 2020, 2022, 2023, and beyond came together in a spectacular showcase of talent, unity, and school spirit.',
      eventName: 'ACOSA Alumni Celebration',
      date: 'April 4, 2026',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM-gk0ykXlrHHZgtKp42IZRqwfLg6KxiL.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM%20%281%29-ZLAkwee8DYN6W70pkGx6LzqH88iY9d.jpeg',
      ],
      author: 'Oscar Ogwari',
      avatar: '/acosa-badge.jpg',
      role: 'Alumni Association President',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
    {
      id: 10,
      title: 'Class Competition - The ACOSA Spirit Lives On',
      description: 'The friendly rivalry between our classes keeps ACOSA athletics vibrant and exciting! Every match tells a story of dedication and school pride. We compete with respect and celebrate with joy.',
      eventName: 'Inter-Class Tournament',
      date: 'April 4, 2026',
      location: 'ACOSA Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%208.58.30%20PM-3vEyRVrtawu5MgZfOMZ0h7WmVyoKAT.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%208.58.29%20PM-OZDo8cqV2LjoXj7W3PkK7fxJ5osREq.jpeg',
      ],
      author: 'Ishagi Shadrack',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Coordinator, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'April 4, 2026',
    },
  ];

  const testimonyPosts = [
    {
      id: 1,
      author: 'Maraka Ben',
      avatar: '/acosa-badge.jpg',
      role: 'Event Coordinator',
      company: 'ACOSA',
      title: 'What an amazing tournament!',
      content: 'The April 4th sports tournament was incredible! Seeing all classes come together, compete with passion, and celebrate as one family reminded me why ACOSA is special. Thank you to everyone who participated!',
      timestamp: 'April 4, 2026',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 5,
    },
    {
      id: 2,
      author: 'Amuge Joan',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Director',
      company: 'ACOSA',
      title: 'Best sports event yet!',
      content: 'The energy at the stadium was unmatched! From the opening ceremony to the finals, every moment was filled with excitement. Proud of our ACOSA athletes!',
      timestamp: 'April 4, 2026',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 5,
    },
    {
      id: 3,
      author: 'Mrs. Kamwada',
      avatar: '/acosa-badge.jpg',
      role: 'Event Organizer',
      company: 'ACOSA',
      title: 'A day to remember',
      content: 'Planning this event was a journey, but seeing the smiles, the teamwork, and the celebration made it all worth it. This is what community looks like!',
      timestamp: 'April 4, 2026',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 5,
    },
    {
      id: 4,
      author: 'Okello George',
      avatar: '/acosa-badge.jpg',
      role: 'Team Captain',
      company: 'ACOSA',
      title: 'Proud of our team',
      content: 'Leading our team to victory was amazing, but the friendships and memories we made mean even more. Thank you ACOSA for this platform!',
      timestamp: 'April 4, 2026',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 5,
    },
  ];

  const jobPostings = [
    {
      id: 1,
      title: 'Sports Coordinator',
      company: 'ACOSA Alumni Association',
      logo: '/acosa-badge.jpg',
      location: 'Kampala, Uganda',
      salary: 'Competitive',
      type: 'Part-time',
      description: 'Help organize ACOSA sports events and tournaments. Must have experience in event planning and team coordination.',
      postedBy: 'Maraka Ben',
      avatar: '/acosa-badge.jpg',
      timestamp: 'April 5, 2026',
      likes: 0,
      applyUrl: 'mailto:careers@acosa.org',
    },
    {
      id: 2,
      title: 'Event Photographer',
      company: 'ACOSA Media Team',
      logo: '/acosa-badge.jpg',
      location: 'Kampala, Uganda',
      salary: 'Contract basis',
      type: 'Freelance',
      description: 'Capture ACOSA events and tournaments. Professional photography experience required.',
      postedBy: 'Shaggy Shadrach',
      avatar: '/acosa-badge.jpg',
      timestamp: 'April 5, 2026',
      likes: 0,
      applyUrl: 'mailto:media@acosa.org',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'ACOSA Annual General Meeting 2026',
      description: 'Join us for the AGM where we will discuss the year\'s achievements and plan for 2027. All members are welcome!',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      date: 'June 15, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'ACOSA Headquarters, Kampala',
      organizer: 'Oscar Ogwari',
      avatar: '/acosa-badge.jpg',
      attendees: 150,
      likes: 0,
      timestamp: 'Coming Soon',
      productId: 'agm-2026',
    },
    {
      id: 2,
      title: 'ACOSA Alumni Networking Dinner',
      description: 'An evening of networking, great food, and connecting with fellow alumni. Guest speakers and entertainment.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop',
      date: 'July 20, 2026',
      time: '6:00 PM - 10:00 PM',
      location: 'Kampala Serena Hotel',
      organizer: 'Mrs. Kamwada',
      avatar: '/acosa-badge.jpg',
      attendees: 200,
      likes: 0,
      timestamp: 'Coming Soon',
      productId: 'networking-dinner',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 w-full lg:max-w-2xl px-0 py-0 md:px-0 lg:px-0 mx-auto lg:mx-0">
          {activeTab === 'home' && (
            <div className="space-y-0">
              <TeamsShowcase />

              <div className="px-4 md:px-6 lg:px-8 py-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">April 4, 2026 - ACOSA Sports Tournament</h1>
                  <p className="text-muted-foreground">Relive the incredible moments from our historic sports tournament</p>
                </div>
              </div>
              
              <div className="px-4 md:px-6 lg:px-8 space-y-6">
                {memoryPosts.map((post) => (
                  <MemoryPostCard key={post.id} {...post} />
                ))}

                <div className="flex justify-center py-8">
                  <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                    Load More Memories
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-6 px-4 md:px-6 lg:px-8">
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Tournament Testimonies</h1>
                <p className="text-muted-foreground">Hear what our members said about the April 4th sports tournament</p>
              </div>

              {testimonyPosts.map((post) => (
                <TestimonyCard key={post.id} {...post} />
              ))}

              <div className="flex justify-center py-8">
                <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                  Load More Stories
                </button>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-6 px-4 md:px-6 lg:px-8">
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Career Opportunities</h1>
                <p className="text-muted-foreground">Explore opportunities within the ACOSA community</p>
              </div>

              {jobPostings.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}

              <div className="flex justify-center py-8">
                <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                  Load More Jobs
                </button>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6 px-4 md:px-6 lg:px-8">
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Upcoming Events</h1>
                <p className="text-muted-foreground">Join us for our next ACOSA gatherings</p>
              </div>

              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  productId={event.productId}
                />
              ))}

              <div className="flex justify-center py-8">
                <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                  Load More Events
                </button>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-6 px-4 md:px-6 lg:px-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Tournament Announcements</h1>
                <p className="text-muted-foreground">Thank you to everyone who made April 4th a huge success!</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-2">🏆 Tournament Results</h2>
                <p className="text-muted-foreground">Class of 2022 took home the championship trophy! Congratulations to all participants.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-2">📸 Photos Available</h2>
                <p className="text-muted-foreground">Tournament photos are now available in the gallery. Tag yourself and share your memories!</p>
              </div>
            </div>
          )}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}