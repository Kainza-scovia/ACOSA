'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/auth-context';
import Image from 'next/image';
import { loginWithStudentId } from '../../firebase'; // ← IMPORT AT THE TOP

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!studentId.trim() || !password.trim()) {
      setError('Please enter both Student ID and Password');
      setIsLoading(false);
      return;
    }

    try {
      // REAL Firebase authentication - only 17 members can login
      const userData = await loginWithStudentId(studentId, password);
      
      // Save user info based on "Remember me" checkbox
      const rememberMe = (document.getElementById('remember') as HTMLInputElement)?.checked;
      
      if (rememberMe) {
        localStorage.setItem('acosaUser', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('acosaUser', JSON.stringify(userData));
      }
      
      // Login user with auth context
      login(studentId, userData.name);
      
      // Redirect to home page
      router.push('/');
      
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid Student ID or password. Access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex-col justify-between p-12">
        <div className="flex flex-col items-center">
          <Image
            src="/acosa-logo.png"
            alt="ACOSA Logo"
            width={200}
            height={200}
            className="mb-6"
          />
          <h1 className="text-4xl font-bold mb-2 text-center">ACOSA</h1>
          <p className="text-lg text-primary-foreground/80 text-center">Alumni Community & Network</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Welcome to ACOSA</h2>
          <p className="text-lg text-primary-foreground/80 mb-6">
            Connect with fellow alumni, explore opportunities, and stay engaged with our vibrant community.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold">Network</h3>
                <p className="text-sm text-primary-foreground/80">Connect with thousands of alumni</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h3 className="font-semibold">Opportunities</h3>
                <p className="text-sm text-primary-foreground/80">Access job listings and events</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-primary-foreground/80">Stay informed and engaged</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2025 ACOSA. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex flex-col items-center">
            <Image
              src="/acosa-logo.png"
              alt="ACOSA Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-foreground">ACOSA</h1>
            <p className="text-sm text-muted-foreground">Alumni Community & Network</p>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
            {/*<p className="text-muted-foreground">
              Enter your credentials to access your ACOSA account
            </p>*/}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Student ID Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Membership ID
              </label>
              <Input
                type="text"
                placeholder="Enter your ACOSA Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
              {/*<p className="text-xs text-muted-foreground">
                e.g., ACOSA|2015|0001
              </p> */} 
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col gap-4 text-sm">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-primary hover:underline font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
              {/*<div className="text-center text-muted-foreground">
                Need help?{' '}
                <Link href="/" className="text-primary hover:underline font-medium">
                  Contact us
                </Link>
              </div>*/}
              <div className="flex gap-4 justify-center text-muted-foreground text-xs">
                <Link href="/" className="hover:text-foreground">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Home *
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Home
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}