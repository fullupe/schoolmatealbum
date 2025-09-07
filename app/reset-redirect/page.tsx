'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetRedirectPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [isClient, setIsClient] = useState(false);




  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Log all parameters for debugging
  useEffect(() => {
    const params: string[] = [];
    searchParams.forEach((value, key) => {
      params.push(`${key}=${value}`);
    });
    
    const debugText = `Received parameters: ${params.join(', ')}`;
    console.log(debugText);
    setDebugInfo(debugText);
  }, [searchParams]);









  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const redirectToApp = () => {
      if (type === 'recovery' && token) {
        // Redirect to your app using custom scheme
        window.location.href = `myapp://reset-password?token=${encodeURIComponent(token)}`;
        
        setTimeout(() => {
          if (!document.hidden) {
            setIsRedirecting(false);
          }
        }, 1500);
      }
    };

    if (token && type) {
      redirectToApp();
    } else {
      setIsRedirecting(false);
    }
  }, [token, type, isClient]);

  const handleAppRedirect = () => {
    if (token) {
      window.location.href = `myapp://reset-password?token=${encodeURIComponent(token)}`;
    }
  };

  const getAppStoreLink = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
      return 'https://apps.apple.com/your-app-store-link';
    } else if (userAgent.includes('android')) {
      return 'https://play.google.com/store/apps/details?id=your.app.id';
    } else {
      return 'https://yourwebsite.com/app-download';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!token || !type) {
    return (
      <>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Invalid Reset Link</h2>
          <p className="text-white/80">The password reset link is invalid or has expired.</p>
        </div>
      </div>


      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Debug Information</h2>
        <p className="text-white/80 mb-4">{debugInfo}</p>
        <p className="text-white/60">Check browser console for more details.</p>
      </div>
    </div>

      

      </>



    );
  }



  return (
    <>
      <title>Redirecting to App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center text-white">
          {isRedirecting ? (
            <>
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-4">Redirecting to App...</h2>
              <p className="text-white/80 mb-6">
                Please wait while we redirect you to the app to complete your password reset.
              </p>
              <button
                onClick={handleAppRedirect}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
              >
                Open App Now
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">App Not Found</h2>
              <p className="text-white/80 mb-6">
                It looks like you don't have our app installed. Would you like to download it?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getAppStoreLink()}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Download App
                </a>
                <button
                  onClick={handleAppRedirect}
                  className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}