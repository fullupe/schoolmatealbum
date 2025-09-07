// app/reset-redirect/page.tsx - HTML REDIRECT PAGE
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetRedirectPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');

    if (type === 'recovery' && token) {
      // Redirect to the app
      window.location.href = `myapp://reset-password?token=${encodeURIComponent(token)}`;
      
      // Fallback: if app doesn't open, show instructions
      setTimeout(() => {
        if (!document.hidden) {
          // Show instructions for manual app opening
          document.getElementById('fallback-instructions')?.classList.remove('hidden');
        }
      }, 1500);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">Redirecting to App...</h2>
        <p className="text-white/80 mb-4">
          Please wait while we redirect you to the SchoolMate app.
        </p>
        
        {/* Fallback instructions */}
        <div id="fallback-instructions" className="hidden">
          <p className="text-white/60 text-sm mb-2">
            If you're not redirected automatically:
          </p>
          <ol className="text-white/60 text-sm text-left list-decimal list-inside space-y-1">
            <li>Open the SchoolMate app</li>
            <li>Go to Settings → Reset Password</li>
            <li>Enter the code manually if needed</li>
          </ol>
        </div>
      </div>
    </div>
  );
}