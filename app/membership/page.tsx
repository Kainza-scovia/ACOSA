'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { RightSidebar } from '@/components/right-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

function MembershipContent() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    classYear: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission and payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setFormData({ fullName: '', email: '', cardNumber: '', classYear: '' });
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Join ACOSA</h1>
            <p className="text-muted-foreground mb-8">Register as an ACOSA member and become part of our vibrant community.</p>

            {success ? (
              <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
                <p className="text-muted-foreground text-center">Welcome to ACOSA! Your membership has been activated.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-6">
                {/* Membership Details */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Membership Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">ACOSA Class Year</label>
                      <select
                        name="classYear"
                        value={formData.classYear}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                      >
                        <option value="">Select class year</option>
                        <option value="2015">Class of 2015</option>
                        <option value="2017">Class of 2017</option>
                        <option value="2018">Class of 2018</option>
                        <option value="2020">Class of 2020</option>
                        <option value="2023">Class of 2023</option>
                        <option value="2025">Class of 2025</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Membership Fees */}
                <div className="border-t border-border pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Payment Summary</h2>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Registration Fee</span>
                      <span className="font-medium">$25.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Annual Membership</span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-semibold text-foreground">Total Amount Due</span>
                      <span className="font-bold text-lg text-primary">$75.00</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !formData.fullName || !formData.email || !formData.classYear}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {isLoading ? 'Processing Payment...' : 'Complete Registration & Pay $75.00'}
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
}

export default function MembershipPage() {
  return (
    <ProtectedRoute>
      <MembershipContent />
    </ProtectedRoute>
  );
}
