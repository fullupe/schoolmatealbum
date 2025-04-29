import { getClassmateById, getAllClassmates } from '@/lib/data/classmates';
import { notFound } from 'next/navigation';
import ProfileHeader from '@/components/classmates/ProfileHeader';
import ProfileContent from '@/components/classmates/ProfileContent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface ClassmatePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all classmate pages
export async function generateStaticParams() {
  const classmates = getAllClassmates();
  return classmates.map((classmate) => ({
    id: classmate.id,
  }));
}

export default function ClassmatePage({ params }: ClassmatePageProps) {
  const classmate = getClassmateById(params.id);
  
  if (!classmate) {
    notFound();
  }
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16"> {/* Space for fixed header */}
        <ProfileHeader classmate={classmate} />
        <ProfileContent classmate={classmate} />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}