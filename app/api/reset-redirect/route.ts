// app/api/reset-redirect/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams, href } = new URL(request.url);
    
    // Log everything for debugging
    console.log('=== SUPABASE REDIRECT DEBUG ===');
    console.log('Full URL:', href);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    console.log('Hash:', request.url.split('#')[1] || 'No hash');
    console.log('==============================');

    // Try to get token from various possible locations
    let token = searchParams.get('token') || 
                searchParams.get('access_token') ||
                extractFromHash(request.url, 'token') ||
                extractFromHash(request.url, 'access_token');

    let type = searchParams.get('type') || 
               searchParams.get('message_type') ||
               extractFromHash(request.url, 'type');

    console.log('Extracted token:', token);
    console.log('Extracted type:', type);

    // Check if we have the required parameters
    if (type === 'recovery' && token) {
      console.log('Redirecting to app...');
      return NextResponse.redirect(`myapp://reset-password?token=${encodeURIComponent(token)}`);
    }

    console.log('Missing parameters, redirecting to error page');
    return NextResponse.redirect('https://schoolmate1999.vercel.app/reset-error');
    
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.redirect('https://schoolmate1999.vercel.app/reset-error');
  }
}

// Helper function to extract parameters from URL hash
function extractFromHash(url: string, param: string): string | null {
  const hash = url.split('#')[1];
  if (!hash) return null;
  
  const hashParams = new URLSearchParams(hash);
  return hashParams.get(param);
}