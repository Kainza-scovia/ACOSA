'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSuccess(true);
    setIsLoading(false);

    // Close modal after success animation
    setTimeout(() => {
      setCardNumber('');
      setPassword('');
      setName('');
      setSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {success && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-foreground font-semibold">
              {mode === 'login'
                ? 'Welcome back!'
                : 'Account created successfully!'}
            </p>
            <p className="text-muted-foreground text-sm">
              {mode === 'login'
                ? 'You\'re now signed in to ACOSA'
                : 'Welcome to the ACOSA community'}
            </p>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={mode === 'signup'}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
            )}

            {/* Membership Card Number field */}
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

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !cardNumber || !password || (mode === 'signup' && !name)}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading
                ? 'Processing...'
                : mode === 'login'
                  ? 'Sign In'
                  : 'Create Account'}
            </Button>

            {/* Toggle Mode */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {mode === 'login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setCardNumber('');
                  setPassword('');
                  setName('');
                }}
                className="text-primary hover:underline font-semibold"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
