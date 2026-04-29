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
      likes: 1,
      comments: 0,
      shares: 0,
      timestamp: '2 week ago',
    },
    {
      id: 2,
      title: 'Championship Celebration - ACOSA Team Triumphs!',
      description: 'Celebrating our championship victory with the incredible ACOSA team! The dedication, teamwork, and resilience shown throughout the season have paid off. From intense matches to unforgettable moments on the pitch, this journey has been amazing. Here\'s to the champions and everyone who supported us!',
      eventName: 'Championship Victory',
      date: 'June 10, 2024',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9448.jpg-rWguQhnMcootvH1iERHKJA3h2jIaMA.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9607.jpg%20%281%29-7LNFY85auCexQkacwmuMbfga278USV.jpeg',
      ],
      author: 'James Chen',
      avatar: '/acosa-badge.jpg',
      role: 'Team Captain, ACOSA',
      likes: 423,
      comments: 67,
      shares: 98,
      timestamp: '2 weeks ago',
    },
    {
      id: 3,
      title: 'Match Day Magic - ACOSA Players in Action',
      description: 'What a spectacular day of football! Our ACOSA athletes displayed exceptional skill, determination, and sportsmanship on the field. Every match was filled with excitement, great plays, and moments that will stay with us forever. Hats off to all the players, referees, and fans who made this day unforgettable. The unity and passion of the ACOSA community shines bright!',
      eventName: 'Inter-School Tournament',
      date: 'June 5, 2024',
      location: 'Regional Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9432.jpg-Tk9iRDKfLyNccC5Z0wkHa53ps7Wzb2.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9447.jpg-nhEshweNiVIZiB3nl79Tvsa9AdvlNQ.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9439.jpg-qLFKZl5AtubRDx5lRnqZQfeNdNdkry.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9202.jpg-SeWPyGrd5Y4ZnrSLYMPwpSkvD3834N.jpeg',
      ],
      author: 'Emma Wilson',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Director, ACOSA',
      likes: 678,
      comments: 145,
      shares: 203,
      timestamp: '3 weeks ago',
    },
    {
      id: 4,
      title: 'ACOSA Class of 2018 - Team Photo Day at the Stadium',
      description: 'What an honor to gather with the incredible Class of 2018 for an official team photo! This group represents the best of ACOSA values - unity, excellence, and pride. Standing together in our official jerseys, we remembered the bonds we\'ve built and the achievements we\'ve accomplished together. Looking forward to many more memories with this amazing cohort!',
      eventName: 'Class of 2018 Team Photo',
      date: 'April 8, 2026',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.45.33%20PM-fAySHGBsvAOUIbswAdWBnR0FFCWiBy.jpeg',
      ],
      author: 'Michael Torres',
      avatar: '/acosa-badge.jpg',
      role: 'Class Secretary, ACOSA',
      likes: 287,
      comments: 45,
      shares: 62,
      timestamp: '5 days ago',
    },
    {
      id: 5,
      title: 'Championship Celebration Finale - ACOSA United in Victory',
      description: 'The final whistle blew and our ACOSA teams rushed to celebrate together! This moment captured the true spirit of our community - diverse teams, united purpose, celebrating each other\'s victories. Whether you scored the winning goal or supported from the sidelines, this moment belongs to all of us. This is what ACOSA is truly about - togetherness!',
      eventName: 'Championship Finals Celebration',
      date: 'April 6, 2026',
      location: 'ACOSA Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9487.jpg-TFLvvq6xRUg4xQ0sosJ2Q83zZkmscI.jpeg',
      ],
      author: 'Lisa Rodriguez',
      avatar: '/acosa-badge.jpg',
      role: 'Event Organizer, ACOSA',
      likes: 512,
      comments: 78,
      shares: 134,
      timestamp: '6 days ago',
    },
    {
      id: 6,
      title: 'Team Bonding & Reflection - ACOSA Football Family',
      description: 'After an intense match, our ACOSA team gathered on the field to reflect, recharge, and strengthen the bonds that make us more than just players. These quiet moments together - sitting side by side, supporting each other - are what build lasting friendships and unforgettable memories. This is the ACOSA difference. This is family.',
      eventName: 'Post-Match Team Bonding',
      date: 'April 7, 2026',
      location: 'Regional Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9501.jpg%20%282%29-k256QH5fSrx83MZ4WLKwRjMJhXOzwR.jpeg',
      ],
      author: 'David Okonkwo',
      avatar: '/acosa-badge.jpg',
      role: 'Team Lead, ACOSA Sports',
      likes: 425,
      comments: 56,
      shares: 89,
      timestamp: '4 days ago',
    },
    {
      id: 7,
      title: 'Class of 2022 Champions - Blue Team Glory',
      description: 'Our Class of 2022 represented ACOSA with pride and excellence on the field! In our distinctive blue jerseys, we showcased teamwork, determination, and the true spirit of ACOSA athletics. From intense matches to official team photos at the stadium, every moment reflected our shared commitment to greatness. This is our legacy - a class that played together, won together, and created memories that will last forever.',
      eventName: 'Class of 2022 Tournament Season',
      date: 'April 2026',
      location: 'Multiple Venues',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%201.26.19%20PM-HJWjPPJolEIgPughXJOWSKbUynSi9e.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%204.50.46%20PM-Du39taU9lWqkjFM1P56rgaWqhneZXx.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%204.53.07%20PM-Dl0ZRrwGD7NLMSOuXMnqMhqUqHrROL.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.15.17%20PM-Yyr0f0tqDpxygznN9wsqIA4FT6Xf1y.jpeg',
      ],
      author: 'Samuel Kipchoge',
      avatar: '/acosa-badge.jpg',
      role: 'Class Captain, Class of 2022',
      likes: 756,
      comments: 143,
      shares: 267,
      timestamp: '3 days ago',
    },
    {
      id: 8,
      title: 'Class of 2023 Rising Stars - Red Team Energy',
      description: 'The Class of 2023 brought fresh energy and unstoppable momentum to ACOSA athletics! Wearing our vibrant red jerseys with pride, we proved that we&apos;re not just the future - we&apos;re here now, making our mark. From team celebrations and group photos to individual standout performances, our class has shown exceptional talent, unity, and sportsmanship. We&apos;re honored to represent ACOSA and inspired by our journey together!',
      eventName: 'Class of 2023 Season Highlights',
      date: 'April 2026',
      location: 'ACOSA Athletic Grounds',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.22%20PM-oSilnIFwRbmd3Hl4LyS4slMgKIMXTk.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.25%20PM-pQMTyefKBQm0wey9DZqA9BgkMTsuDI.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.17%20PM-FNNIluA8XOB1zzhiAnNEci3CwYFJ2f.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%209.25.20%20PM-aIyW6iJwSWcLlABk14RAybGjp10fa3.jpeg',
      ],
      author: 'Grace Mutua',
      avatar: '/acosa-badge.jpg',
      role: 'Team Representative, Class of 2023',
      likes: 834,
      comments: 178,
      shares: 312,
      timestamp: '2 days ago',
    },
    {
      id: 9,
      title: 'ACOSA Alumni Showcase - Classes United in Celebration',
      description: 'What an incredible gathering of ACOSA alumni and current teams! Classes of 2020, 2022, 2023, and beyond came together in a spectacular showcase of talent, unity, and school spirit. From the official ceremonies to post-match celebrations with trophy moments, this event captured the essence of what ACOSA means - a family united across generations. Seeing all our different classes (blue, red, pink, and more) playing together, laughing together, and celebrating together reminds us that ACOSA is forever!',
      eventName: 'ACOSA Alumni & Current Teams Celebration',
      date: 'April 9, 2026',
      location: 'Main Stadium & Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM-gk0ykXlrHHZgtKp42IZRqwfLg6KxiL.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM%20%281%29-ZLAkwee8DYN6W70pkGx6LzqH88iY9d.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM%20%282%29-UY5pq29zAfGW0zQc7pjpq8ETNl064a.jpeg',
      ],
      author: 'Christopher Adero',
      avatar: '/acosa-badge.jpg',
      role: 'Alumni Association President',
      likes: 921,
      comments: 267,
      shares: 445,
      timestamp: '1 day ago',
    },
    {
      id: 10,
      title: 'Class Competition & Community - The ACOSA Spirit Lives On',
      description: 'The friendly rivalry between our classes keeps ACOSA athletics vibrant and exciting! Whether it&apos;s Class 2022 in their sharp blue uniforms showing alumni pride, Class 2023 bringing youthful energy in red, or the newer pink and yellow teams joining the tradition, every match tells a story of dedication and school pride. These moments - the celebrations on the field, the camaraderie in victory, the meals shared together after matches - are what bind our ACOSA community. We compete with respect, we celebrate with joy, and we always support each other.',
      eventName: 'Inter-Class Tournament & Celebrations',
      date: 'April 2026',
      location: 'ACOSA Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%208.58.30%20PM-3vEyRVrtawu5MgZfOMZ0h7WmVyoKAT.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%208.58.29%20PM-OZDo8cqV2LjoXj7W3PkK7fxJ5osREq.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%203.32.30%20PM-ToFtuPtH7hWEkhCDv5lSS2eWC4E7uK.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%204.52.25%20PM-anHzS7HdQRmCAexM10ySrvSNAlLXrP.jpeg',
      ],
      author: 'Peter Oduor',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Coordinator, ACOSA',
      likes: 667,
      comments: 124,
      shares: 198,
      timestamp: '2 days ago',
    },
  ];

  const testimonyPosts = [
    {
      id: 1,
      author: 'Sarah Anderson',
      avatar: '/acosa-badge.jpg',
      role: 'VP of Product',
      company: 'TechVenture',
      title: 'ACOSA transformed my career trajectory',
      content: 'The mentorship and networking opportunities through ACOSA were invaluable. I was able to connect with industry leaders, get guidance on my career transitions, and ultimately land my dream role. The community is incredibly supportive and genuine.',
      timestamp: '3 days ago',
      likes: 324,
      comments: 48,
      shares: 12,
      rating: 5,
    },
    {
      id: 2,
      author: 'Michael Torres',
      avatar: '/acosa-badge.jpg',
      role: 'Software Engineer',
      company: 'CloudSystems',
      title: 'Career pivot success story',
      content: 'Started in finance but wanted to switch to tech. ACOSA alumni helped me navigate the transition with advice, interview prep, and job leads. 2 years later, I\'m thriving as a software engineer. Grateful to this amazing community!',
      timestamp: '5 days ago',
      likes: 456,
      comments: 52,
      shares: 23,
      rating: 5,
    },
    {
      id: 3,
      author: 'Lisa Rodriguez',
      avatar: '/acosa-badge.jpg',
      role: 'Founder & CEO',
      company: 'InnovateCo',
      title: 'Built my startup team through ACOSA connections',
      content: 'All three of my co-founders are ACOSA alumni. We met at a networking event and realized our complementary skills could create something amazing. Now we\'re disrupting the market. Thanks to this incredible network!',
      timestamp: '1 week ago',
      likes: 612,
      comments: 89,
      shares: 145,
      rating: 5,
    },
  ];

  const jobPostings = [
    {
      id: 1,
      title: 'Senior Product Manager',
      company: 'TechVenture Inc.',
      logo: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=56&h=56&fit=crop',
      location: 'San Francisco, CA',
      salary: '$150k - $200k',
      type: 'Full-time',
      description: 'We\'re looking for an experienced Product Manager to lead our platform team. You\'ll work with our talented engineering team to build products that millions use daily. Must have 5+ years of experience in SaaS product management.',
      postedBy: 'James Chen',
      avatar: '/acosa-badge.jpg',
      timestamp: '2 days ago',
      likes: 234,
      applyUrl: 'https://www.linkedin.com/jobs/view/3000000001',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'CloudSystems',
      logo: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=56&h=56&fit=crop',
      location: 'Remote',
      salary: '$120k - $160k',
      type: 'Full-time',
      description: 'Join our engineering team as a Full Stack Developer. We use React, Node.js, and AWS. You\'ll have the opportunity to work on scalable systems serving millions of users. 3+ years experience required.',
      postedBy: 'Michael Torres',
      avatar: '/acosa-badge.jpg',
      timestamp: '3 days ago',
      likes: 189,
      applyUrl: 'https://www.linkedin.com/jobs/view/3000000002',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignStudio Co.',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=56&h=56&fit=crop',
      location: 'New York, NY',
      salary: '$100k - $140k',
      type: 'Full-time',
      description: 'Help us create beautiful and intuitive user experiences. We\'re looking for a talented designer with a strong portfolio and experience in design systems. Figma and prototyping skills a must.',
      postedBy: 'Sarah Anderson',
      avatar: '/acosa-badge.jpg',
      timestamp: '4 days ago',
      likes: 156,
      applyUrl: 'https://www.linkedin.com/jobs/view/3000000003',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'ACOSA Tech Talks - AI & Machine Learning Panel',
      description: 'Join us for an insightful panel discussion with industry leaders discussing the latest trends in AI and ML. Q&A session to follow. Perfect for anyone looking to stay ahead in tech!',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      date: 'April 25, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Virtual (Zoom)',
      organizer: 'Sarah Anderson',
      avatar: '/acosa-badge.jpg',
      attendees: 342,
      likes: 423,
      timestamp: '5 days away',
      productId: 'tech-talks-event',
    },
    {
      id: 2,
      title: 'Networking Mixer - Coffee & Conversations',
      description: 'Casual networking event perfect for reconnecting with friends and making new connections. Light refreshments provided. No formal agenda, just genuine conversations and new friendships!',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop',
      date: 'April 28, 2024',
      time: '5:00 PM - 7:00 PM',
      location: 'Coffee House Downtown',
      organizer: 'James Chen',
      avatar: '/acosa-badge.jpg',
      attendees: 178,
      likes: 267,
      timestamp: '8 days away',
      productId: 'networking-mixer-event',
    },
    {
      id: 3,
      title: 'Career Development Workshop - Interview Mastery',
      description: 'Learn proven interview techniques from top recruiters at major tech companies. We\'ll cover behavioral questions, technical interview prep, and negotiation strategies. Bring your questions!',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      date: 'May 5, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Campus Conference Room B',
      organizer: 'Emma Wilson',
      avatar: '/acosa-badge.jpg',
      attendees: 267,
      likes: 398,
      timestamp: '12 days away',
      productId: 'career-workshop-event',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Feed */}
        <main className="flex-1 w-full lg:max-w-2xl px-0 py-0 md:px-0 lg:px-0 mx-auto lg:mx-0">
          {activeTab === 'home' && (
            <div className="space-y-0">
              {/* Teams Showcase */}
              <TeamsShowcase />

              <div className="px-4 md:px-6 lg:px-8 py-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Memories</h1>
                  <p className="text-muted-foreground">Relive incredible moments from past ACOSA events and celebrations</p>
                </div>
              </div>
              
              <div className="px-4 md:px-6 lg:px-8 space-y-6">

                {memoryPosts.map((post) => (
                  <MemoryPostCard key={post.id} {...post} />
                ))}

                {/* Load More */}
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Testimonies & Stories</h1>
                <p className="text-muted-foreground">Hear from alumni about their experiences and success stories</p>
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
                <p className="text-muted-foreground">Explore job openings posted by alumni and partner companies</p>
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
                <p className="text-muted-foreground">Join us at our upcoming webinars, workshops, and networking events</p>
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
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Announcements</h2>
                <p className="text-muted-foreground">Stay updated with important community news</p>
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
