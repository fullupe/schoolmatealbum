import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          We couldn't find the classmate you're looking for. They might have moved or graduated to another page.
        </p>
        <Link href="/">
          <Button>
            Return to Album
          </Button>
        </Link>
      </div>
    </div>
  );
}