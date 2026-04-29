'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="w-full">
        {/* Back Button */}
        <div className="px-4 md:px-8 pt-6 max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section with Image */}
        <div className="relative w-full mt-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Decorative Blue Shape */}
            <div className="absolute -left-20 top-0 w-40 h-40 bg-primary/10 skew-y-12 hidden md:block"></div>
            
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
              <Image
                src="/about-vision.jpg"
                alt="About ACOSA Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="w-full py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                  To foster a community of exceptional leaders who are committed to excellence, integrity, and service. We believe that every member has the potential to become an agent of positive change in their communities, and we are dedicated to providing the platforms, resources, and support necessary to unlock that potential.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Vision</h2>
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                  To be a global network of influential alumni making meaningful impact in their communities and beyond. We envision ACOSA as a beacon of hope and inspiration, known for developing leaders who are not only successful in their careers but also committed to uplifting others and contributing to a better world.
                </p>
              </div>
            </div>

            {/* Decorative Dots */}
            <div className="mt-12 flex justify-end gap-3 flex-wrap">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-primary/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="w-full py-16 px-4 md:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* History */}
            <section>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="/about-history.jpg"
                    alt="History"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our History</h2>
                  <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                    The Association of Covenant Oriented Students and Alumni (ACOSA) was founded with a vision to create a strong community of leaders committed to excellence and service. Over the years, ACOSA has grown into a vibrant network of alumni and students from various backgrounds, united by shared values and a commitment to making a difference in society.
                  </p>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Values</h2>
                  <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                    Excellence: We strive for the highest standards in all endeavors. Integrity: We operate with honesty and transparency. Service: We are committed to serving our communities. Unity: We celebrate diversity and foster inclusivity. Leadership: We develop and empower the next generation of leaders.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="/about-values.jpg"
                    alt="Core Values"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Purpose */}
            <section>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200">
                  <Image
                    src="/about-purpose.jpg"
                    alt="Purpose"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Purpose</h2>
                  <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                    ACOSA exists to bridge the gap between academic learning and real-world application, creating opportunities for alumni and students to connect, collaborate, and contribute to meaningful causes. We believe in the power of community and the potential of every individual to create positive change.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="w-full py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ProtectedRoute>
      <AboutContent />
    </ProtectedRoute>
  );
}
