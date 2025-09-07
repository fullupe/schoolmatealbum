// app/reset-redirect/page.tsx - COMPLETE WORKING VERSION
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetRedirectPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Function to extract parameters from URL
    const extractParameters = () => {
      // Check query parameters
      const queryToken = searchParams.get('token') || 
                         searchParams.get('access_token') ||
                         searchParams.get('code');
      
      // Check hash parameters
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const hashToken = hashParams.get('token') || 
                        hashParams.get('access_token') ||
                        hashParams.get('code');

      return {
        token: queryToken || hashToken
      };
    };

    const { token: extractedToken } = extractParameters();

    console.log('Extracted token:', extractedToken);

    if (extractedToken) {
      setToken(extractedToken);
      
      // Detect if we're likely in a development environment
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      const isDev = process.env.NODE_ENV === 'development';
      
      // Use Expo Go scheme for development, custom scheme for production
      const scheme = isLocalhost || isDev 
        ? 'exp://192.168.1.100:8081/--/reset-password' 
        : 'myapp://reset-password';
      
      window.location.href = `${scheme}?token=${encodeURIComponent(extractedToken)}`;
      
      // Show fallback if app doesn't open
      setTimeout(() => {
        if (!document.hidden) {
          setShowFallback(true);
        }
      }, 2000);
    }
  }, [searchParams]);

  const handleOpenApp = () => {
    if (token) {
      // Use the same logic to determine the scheme
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      const isDev = process.env.NODE_ENV === 'development';
      
      const scheme = isLocalhost || isDev 
        ? 'exp://192.168.1.100:8081/--/reset-password' 
        : 'myapp://reset-password';
      
      window.location.href = `${scheme}?token=${encodeURIComponent(token)}`;
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert('Token copied to clipboard! Open the app and paste it.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
          <p className="text-white/80">The password reset link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
        {!showFallback ? (
          <>
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">Redirecting to SchoolMate App...</h2>
            <p className="text-white/80">
              Please wait while we redirect you to complete your password reset.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Open SchoolMate App</h2>
            <p className="text-white/80 mb-6">
              We couldn't automatically redirect you. Please open the app manually to continue.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleOpenApp}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors duration-200"
              >
                Open SchoolMate App
              </button>
              
              <button
                onClick={handleCopyToken}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200"
              >
                Copy Verification Code
              </button>
              
              <p className="text-white/60 text-sm">
                If the app doesn't open, copy the code and paste it in the app.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}