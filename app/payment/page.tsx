'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Smartphone, AlertCircle, ArrowRight, Wrench, Clock } from 'lucide-react';
import { auth, db } from '@/firebase';

interface UserData {
  email: string;
  password: string;
  fullName: string;
  classYear: string;
  studentId: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const MEMBERSHIP_FEE = 30000;

  // Load user data from session storage
  useEffect(() => {
    const tempUser = sessionStorage.getItem('tempUser');
    if (!tempUser) {
      router.push('/signup');
      return;
    }
    setUserData(JSON.parse(tempUser));
  }, [router]);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number (e.g., 0777123456)');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show maintenance message
    setError('⚠️ Mobile Money payment service is currently under maintenance. Please check back later or contact ACOSA admin to complete your registration.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
            <Wrench className="w-12 h-12 text-white mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-white mb-1">Payment System Under Maintenance</h1>
            <p className="text-white/80 text-sm">We're currently upgrading our payment system</p>
          </div>

          <div className="p-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Service Temporarily Unavailable</p>
                  <p className="text-sm text-muted-foreground">
                    Mobile Money payments are currently offline for maintenance. 
                    Please try again later or contact ACOSA administration to complete your membership registration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Membership Fee:</span>
                <span className="font-bold text-lg">{MEMBERSHIP_FEE.toLocaleString()} UGX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid for:</span>
                <span className="font-medium">1 Year</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                <p className="text-amber-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-4">
              {/* Payment Method - Disabled */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Mobile Money Provider
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="p-3 border rounded-lg text-center opacity-50 cursor-not-allowed bg-muted"
                    disabled
                  >
                    <span className="font-semibold">MTN Mobile Money</span>
                  </button>
                  <button
                    type="button"
                    className="p-3 border rounded-lg text-center opacity-50 cursor-not-allowed bg-muted"
                    disabled
                  >
                    <span className="font-semibold">Airtel Money</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ⚠️ Temporarily disabled for maintenance
                </p>
              </div>

              {/* Phone Number - Disabled */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mobile Money Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="0777123456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={true}
                  className="w-full opacity-50"
                />
              </div>

              {/* Payment Button - Shows Maintenance Message */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base bg-amber-500 hover:bg-amber-600"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Checking...
                  </>
                ) : (
                  'Pay 30,000 UGX (Temporarily Unavailable)'
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Need to complete your registration?{' '}
                  <a href="mailto:admin@acosa.org" className="text-primary hover:underline">
                    Contact ACOSA Admin
                  </a>
                </p>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/signup')}
                  className="w-full"
                >
                  ← Back to Signup
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}