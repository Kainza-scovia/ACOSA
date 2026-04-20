'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { TeamsShowcase } from '@/components/teams-showcase';
import { MemoryPostCard } from '@/components/memory-post-card';
import { TestimonyCard } from '@/components/testimony-card';
import { JobCard } from '@/components/job-card';
import { EventCard } from '@/components/event-card';

export default function Home() {
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
      timestamp: '3 week ago',
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
      author: 'Joann Amuge',
      avatar: '/acosa-badge.jpg',
      role: 'Team Captain, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
    },
    {
      id: 3,
      title: 'Match Day Magic - ACOSA Players in Action',
      description: 'What a spectacular day of football! Our ACOSA athletes displayed exceptional skill, determination, and sportsmanship on the field. Every match was filled with excitement, great plays, and moments that will stay with us forever. Hats off to all the players, referees, and fans who made this day unforgettable. The unity and passion of the ACOSA community shines bright!',
      eventName: 'Inter-School Tournament',
      date: 'April 4, 2026',
      location: 'Regional Sports Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9432.jpg-Tk9iRDKfLyNccC5Z0wkHa53ps7Wzb2.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9447.jpg-nhEshweNiVIZiB3nl79Tvsa9AdvlNQ.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9439.jpg-qLFKZl5AtubRDx5lRnqZQfeNdNdkry.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9202.jpg-SeWPyGrd5Y4ZnrSLYMPwpSkvD3834N.jpeg',
      ],
      author: 'Mrs. kamwada',
      avatar: '/acosa-badge.jpg',
      role: 'Sports Director, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
    },
    {
      id: 4,
      title: 'ACOSA Class of 2018 - Team Photo Day at the Stadium',
      description: 'What an honor to gather with the incredible Class of 2018 for an official team photo! This group represents the best of ACOSA values - unity, excellence, and pride. Standing together in our official jerseys, we remembered the bonds we\'ve built and the achievements we\'ve accomplished together. Looking forward to many more memories with this amazing cohort!',
      eventName: 'Class of 2018 Team Photo',
      date: 'April 4, 2026',
      location: 'Main Stadium',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-09%20at%2012.45.33%20PM-fAySHGBsvAOUIbswAdWBnR0FFCWiBy.jpeg',
      ],
      author: 'Okello George',
      avatar: '/acosa-badge.jpg',
      role: 'Class Secretary, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
    },
    {
      id: 5,
      title: 'Championship Celebration Finale - ACOSA United in Victory',
      description: 'The final whistle blew and our ACOSA teams rushed to celebrate together! This moment captured the true spirit of our community - diverse teams, united purpose, celebrating each other\'s victories. Whether you scored the winning goal or supported from the sidelines, this moment belongs to all of us. This is what ACOSA is truly about - togetherness!',
      eventName: 'Championship Finals Celebration',
      date: 'April 4, 2026',
      location: 'ACOSA Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DPM_9487.jpg-TFLvvq6xRUg4xQ0sosJ2Q83zZkmscI.jpeg',
      ],
      author: 'Lisa Acam',
      avatar: '/acosa-badge.jpg',
      role: 'Event Organizer, ACOSA',
      likes: 0,
      comments: 0,
      shares: 0,
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
      author: 'Shaggy shadrack',
      avatar: '/acosa-badge.jpg',
      role: 'Team Lead, ACOSA Sports',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
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
      author: 'Ms. Celina',
      avatar: '/acosa-badge.jpg',
      role: 'Top cheer-leader of 2017',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
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
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
    },
    {
      id: 9,
      title: 'ACOSA Alumni Showcase - Classes United in Celebration',
      description: 'What an incredible gathering of ACOSA alumni and current teams! Classes of 2020, 2022, 2023, and beyond came together in a spectacular showcase of talent, unity, and school spirit. From the official ceremonies to post-match celebrations with trophy moments, this event captured the essence of what ACOSA means - a family united across generations. Seeing all our different classes (blue, red, pink, and more) playing together, laughing together, and celebrating together reminds us that ACOSA is forever!',
      eventName: 'ACOSA Alumni & Current Teams Celebration',
      date: 'April 4, 2026',
      location: 'Main Stadium & Athletic Complex',
      images: [
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM-gk0ykXlrHHZgtKp42IZRqwfLg6KxiL.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM%20%281%29-ZLAkwee8DYN6W70pkGx6LzqH88iY9d.jpeg',
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-10%20at%201.14.35%20PM%20%282%29-UY5pq29zAfGW0zQc7pjpq8ETNl064a.jpeg',
      ],
      author: 'Christopher Adero',
      avatar: '/acosa-badge.jpg',
      role: 'Alumni Association President',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
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
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '3 weeks ago',
    },
  ];

  const testimonyPosts = [
    {
      id: 1,
      author: 'Kainza Scovia',
      avatar: '/acosa-badge.jpg',
      role: 'Data Analyst/scientist',
      company: 'TechVenture',
      title: 'ACOSA is doing something meaningful by bringing us together',
      content: 'It’s not just about organizing an event, but about reconnecting people, restoring old friendships, and reminding us of where we come from. There’s a real sense of belonging here, and it feels like we are rebuilding a community that still matters to all of ustry leaders, get guidance on my career transitions, and ultimately land my dream role. The community is incredibly supportive and genuine.',
      timestamp: '3 days ago',
      likes: 1,
      comments: 0,
      shares: 0,
      rating: 5,
    },
    {
      id: 2,
      author: 'Gloria A',
      avatar: '/acosa-badge.jpg',
      role: 'Accountant',
      company: 'MVP',
      title: 'This initiative should grow into bigger annual events',
      content: 'If continued consistently, it can become a tradition that everyone looks forward to every year with pride and excitement',
      timestamp: '5 days ago',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 0,
    },
    {
      id: 3,
      author: 'Lisa Acan',
      avatar: '/acosa-badge.jpg',
      role: 'Founder & CEO',
      company: 'InnovateCo',
      title: 'I see real leadership and organization in this association.',
      content: 'I can clearly see real leadership and strong organization in the way ACOSA planned and executed this event.',
      timestamp: '1 week ago',
      likes: 0,
      comments: 0,
      shares: 0,
      rating: 0,
    },
  ];

  const jobPostings = [
    {
      id: 1,
      title: 'Sales Coordinator / Sales Executive ',
      company: 'DELUX Advertising',
      logo: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=56&h=56&fit=crop',
      location: 'Kampala',
      salary: 'Not disclosed',
      type: 'Full-time',
      description: 'Please, try your Luck',
      postedBy: 'James Chen',
      avatar: '/acosa-badge.jpg',
      timestamp: '1 days ago',
      likes: 0,
      applyUrl: 'https://www.greatugandajobs.com/jobs/job-detail/job-Sales-Coordinator-Sales-Executive-%E2%80%93-Corporate-Gifting-Promotional-Products-job-at-Deluxe-Advertising-Solutions-Uganda-Limited-99174',
    },
    {
      id: 2,
      title: 'Secretary/Administrative Assistant job',
      company: 'Beta Track',
      logo: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=56&h=56&fit=crop',
      location: 'Kampala',
      salary: 'Not disclosed',
      type: 'Full-time',
      description: 'Join our engineering team as a Full Stack Developer. We use React, Node.js, and AWS. You\'ll have the opportunity to work on scalable systems serving millions of users. 3+ years experience required.',
      postedBy: 'Kainza scovia',
      avatar: '/acosa-badge.jpg',
      timestamp: '1 days ago',
      likes: 0,
      applyUrl: 'https://betatrack.tech/',
    },
    {
      id: 3,
      title: 'Head of Human Resources',
      company: 'Acacia Foundation.',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=56&h=56&fit=crop',
      location: 'New York, NY',
      salary: 'Not disclosed',
      type: 'Full-time',
      description: 'Help us create beautiful and intuitive user experiences. We\'re looking for a talented designer with a strong portfolio and experience in design systems. Figma and prototyping skills a must.',
      postedBy: 'Kainza scovia',
      avatar: '/acosa-badge.jpg',
      timestamp: '3 days ago',
      likes: 0,
      applyUrl: 'https://acaciafoundationltd.com/',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Coffee. Dinner. Connection',
      description: 'The game brought us together, but this is where it truly begins join us for coffee and dinner as we kickstart the vision of ACOSA, building conversations, connections, and a community that lasts',
      image: 'https://img.freepik.com/free-photo/group-afro-americans-working-together_1303-8970.jpg?semt=ais_hybrid&w=740&q=80',
      date: 'Deceber 27, 2026',
      time: '11:00 PM - 6:00 PM',
      location: 'Wash and Wills',
      organizer: 'Arong Joseph',
      avatar: '/acosa-badge.jpg',
      attendees: 24,
      likes: 0,
      timestamp: '---',
      productId: 'Community growth Talk-event',
    },
    {
      id: 2,
      title: 'A step towards action',
      description: 'We start with conversations, but we don’t stop there. After coffee and dinner, ACOSA moves into action making a real difference through community work.',
      image: 'https://www.earth.ac.cr/wp-content/uploads/2024/05/PortadaASU.jpg',
      date: 'Will be agreed-upon by members',
      time: '7:00 am - 4:00 PM',
      location: 'Amus Hills',
      organizer: 'Maraka Ben And Akol Alfred',
      avatar: '/acosa-badge.jpg',
      attendees: 0,
      likes: 0,
      timestamp: '---',
      productId: 'networking-mixer-event',
    },
    {
      id: 3,
      title: 'Career Development Workshop',
      description: 'As part of building a stronger ACOSA community, this career development workshop will empower members with knowledge, skills, and connections.It will also create a space to openly discuss challenges and turn them into real opportunities',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      date: 'Will be agreed-upon by members',
      time: '1:00 PM - 5:00 PM',
      location: 'Kampala',
      organizer: 'Chaiperson and its carbinet',
      avatar: '/acosa-badge.jpg',
      attendees: 0,
      likes: 0,
      timestamp: '--',
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
