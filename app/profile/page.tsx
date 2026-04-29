'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/auth-context';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { isLoggedIn, user, isHydrated } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      router.push('/login');
    }
    
    // Get user data from localStorage
    const storedUser = localStorage.getItem('acosaUser') || sessionStorage.getItem('acosaUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [isHydrated, isLoggedIn, router]);

  if (!isHydrated || !isLoggedIn) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Name</label>
          <p className="text-lg font-semibold">{userData?.name || 'ACOSA Member'}</p>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground">Student ID</label>
          <p className="text-lg font-semibold">{userData?.studentId || user?.id || 'Not available'}</p>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground">Year</label>
          <p className="text-lg font-semibold">{userData?.year || 'Not available'}</p>
        </div>
        
        <div>
          <label className="text-sm text-muted-foreground">Member Since</label>
          <p className="text-lg font-semibold">{new Date().getFullYear()}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => router.push('/profile/change-password')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}