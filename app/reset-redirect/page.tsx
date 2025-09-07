// app/reset-redirect/page.tsx - COMPLETE UPDATED VERSION
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetRedirectPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Enhanced function to extract token from URL
    const extractTokenFromURL = () => {
      const fullURL = window.location.href;
      console.log('Full URL:', fullURL);
      
      // 1. First, check for OTP code (6 digits)
      const otpMatch = fullURL.match(/(?:\?|&|#)token=(\d{6})/);
      if (otpMatch) {
        console.log('Found OTP code:', otpMatch[1]);
        return otpMatch[1];
      }
      
      // 2. Check for long tokens (pkce_ format)
      const tokenMatch = fullURL.match(/(pkce_[\w]+)/);
      if (tokenMatch) {
        console.log('Found PKCE token:', tokenMatch[1]);
        return tokenMatch[1];
      }
      
      // 3. Check standard query parameters
      const queryToken = searchParams.get('token');
      if (queryToken) {
        console.log('Found query token:', queryToken);
        return queryToken;
      }
      
      // 4. Check hash parameters
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const hashToken = hashParams.get('token');
      if (hashToken) {
        console.log('Found hash token:', hashToken);
        return hashToken;
      }
      
      // 5. Check for access_token or code (common alternatives)
      const accessToken = searchParams.get('access_token') || hashParams.get('access_token');
      const code = searchParams.get('code') || hashParams.get('code');
      
      if (accessToken) {
        console.log('Found access token:', accessToken);
        return accessToken;
      }
      
      if (code) {
        console.log('Found code:', code);
        return code;
      }
      
      console.log('No token found in URL');
      return null;
    };

    const extractedToken = extractTokenFromURL();

    if (extractedToken) {
      setToken(extractedToken);
      
      // Determine if it's an OTP (6 digits) or a long token
      const isOtp = /^\d{6}$/.test(extractedToken);
      
      // Use appropriate deep link format
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      const isDev = process.env.NODE_ENV === 'development';
      
      const scheme = isLocalhost || isDev 
        ? 'exp://192.168.1.100:8081/--/reset-password' 
        : 'myapp://reset-password';
      
      // Include token type in the deep link
      const deepLink = isOtp 
        ? `${scheme}?otp=${encodeURIComponent(extractedToken)}`
        : `${scheme}?token=${encodeURIComponent(extractedToken)}`;
      
      console.log('Redirecting to:', deepLink);
      window.location.href = deepLink;
      
      // Show fallback if app doesn't open
      setTimeout(() => {
        if (!document.hidden) {
          setShowFallback(true);
        }
      }, 2000);
    }
  }, [searchParams, isClient]);

  const handleOpenApp = () => {
    if (token) {
      const isOtp = /^\d{6}$/.test(token);
      const isLocalhost = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
      const isDev = process.env.NODE_ENV === 'development';
      
      const scheme = isLocalhost || isDev 
        ? 'exp://192.168.1.100:8081/--/reset-password' 
        : 'myapp://reset-password';
      
      const deepLink = isOtp 
        ? `${scheme}?otp=${encodeURIComponent(token)}`
        : `${scheme}?token=${encodeURIComponent(token)}`;
      
      window.location.href = deepLink;
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      alert(`Verification code copied to clipboard: ${token}`);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

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

  const isOtp = /^\d{6}$/.test(token);

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
            
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-white/60 mb-2">
                {isOtp ? 'Your verification code:' : 'Your reset token:'}
              </p>
              <p className="font-mono text-lg font-bold text-white">
                {token}
              </p>
              {isOtp && (
                <p className="text-sm text-white/60 mt-2">
                  This 6-digit code expires soon for security.
                </p>
              )}
            </div>
            
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
                Copy {isOtp ? 'Verification Code' : 'Token'}
              </button>
              
              <p className="text-white/60 text-sm">
                {isOtp 
                  ? 'If the app doesn\'t open, copy this 6-digit code and enter it in the app.'
                  : 'If the app doesn\'t open, copy this token and paste it in the app.'
                }
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}