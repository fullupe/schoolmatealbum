// app/reset-redirect/page.tsx - FIXED VERSION
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Supabase might use # instead of ? for parameters
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Try to get token from multiple possible locations
    let token = searchParams.get('token') || 
                urlParams.get('token') ||
                getParamFromHash(hash, 'token');
    
    let type = searchParams.get('type') || 
               urlParams.get('type') ||
               getParamFromHash(hash, 'type');

    console.log('Token:', token);
    console.log('Type:', type);
    console.log('Full URL:', window.location.href);
    console.log('Hash:', hash);
    console.log('Search params:', window.location.search);

    if (type === 'recovery' && token) {
      // Redirect to app
      window.location.href = `myapp://reset-password?token=${encodeURIComponent(token)}`;
      
      setTimeout(() => {
        if (!document.hidden) {
          setStatus('error');
        }
      }, 1500);
    } else {
      setStatus('error');
    }
  }, [searchParams, router]);

  const getParamFromHash = (hash: string, param: string): string | null => {
    const hashParams = new URLSearchParams(hash.replace('#', ''));
    return hashParams.get(param);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
          <p className="text-white/80 mb-4">
            The password reset link is invalid or has expired.
          </p>
          <p className="text-white/60 text-sm">
            Please request a new password reset link from the app.
          </p>
        </div>
      </div>
    );
  }

  return null;
}