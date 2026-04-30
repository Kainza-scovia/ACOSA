'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowRight, Users, Briefcase, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/auth-context';
import Image from 'next/image';
import { loginWithStudentId } from '../../firebase';

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

    if (!studentId.trim() || !password.trim()) {
      setError('Please enter both Student ID and Password');
      setIsLoading(false);
      return;
    }

    try {
      const userData = await loginWithStudentId(studentId, password);
      const rememberMe = (document.getElementById('remember') as HTMLInputElement)?.checked;
      
      if (rememberMe) {
        localStorage.setItem('acosaUser', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('acosaUser', JSON.stringify(userData));
      }
      
      login(studentId, userData.name);
      router.push('/');
      
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid Student ID or password. Access denied.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header - Red gradient (keeping ACOSA brand) */}
          <div className="bg-gradient-to-r from-red-700 to-red-800 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-4">
                <Image
                  src="/acosa-logo.png"
                  alt="ACOSA Logo"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-white/80 text-sm">Sign in to continue to ACOSA</p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            {/* Feature Badges - Red theme to match dashboard */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-red-50 rounded-xl p-2 text-center border border-red-100">
                <Users className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Network</p>
              </div>
              <div className="bg-red-50 rounded-xl p-2 text-center border border-red-100">
                <Briefcase className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Jobs</p>
              </div>
              <div className="bg-red-50 rounded-xl p-2 text-center border border-red-100">
                <Calendar className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Events</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Student ID Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Membership ID
                </label>
                <Input
                  type="text"
                  placeholder="ACOSA/2015/0001"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled={isLoading}
                  className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-xl"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter your ACOSA membership ID
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button - Red (matching dashboard primary) */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-red-600 hover:text-red-700 font-semibold">
                  Join ACOSA Today
                </Link>
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex gap-4 justify-center text-xs text-gray-400">
                <Link href="/privacy" className="hover:text-gray-600">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-gray-600">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link href="/contact" className="hover:text-gray-600">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-200 text-xs">
            © 2025 ACOSA Alumni Association. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}