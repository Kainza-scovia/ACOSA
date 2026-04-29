'use client';

import { useState } from 'react';
import { X, CheckCircle, Loader } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EventRegistrationModalProps {
  isOpen: boolean;
  eventTitle: string;
  onClose: () => void;
}

export function EventRegistrationModal({
  isOpen,
  eventTitle,
  onClose,
}: EventRegistrationModalProps) {
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !cardNumber || !email) {
      return;
    }

    setIsLoading(true);

    // Simulate registration processing
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // Close modal after success animation
      setTimeout(() => {
        setFullName('');
        setCardNumber('');
        setEmail('');
        setSuccess(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Event Registration</h2>
            <p className="text-muted-foreground text-sm mt-1">{eventTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Form or Success */}
        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Registration Confirmed!
              </h3>
              <p className="text-muted-foreground text-center">
                You&apos;re all set for {eventTitle}. A confirmation email will be sent shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              {/* ACOSA Membership Card Number */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  ACOSA Membership Card Number
                </label>
                <Input
                  type="text"
                  placeholder="e.g., ACOSA-2023-001234"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.toUpperCase())}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You&apos;ll find this on your ACOSA membership card
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !fullName || !cardNumber || !email}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 py-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Processing Registration...</span>
                  </div>
                ) : (
                  'Complete Registration'
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Info Footer */}
        {!success && (
          <div className="bg-secondary/30 border-t border-border p-4">
            <p className="text-xs text-muted-foreground">
              🔒 Your information is secure and will only be used for event registration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
