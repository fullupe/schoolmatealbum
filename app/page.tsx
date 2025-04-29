import Banner from '@/components/home/Banner';
import PictureSection from '@/components/home/PictureSection';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { bannerSlides, classmates } from '@/lib/data/classmates';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Banner slides={bannerSlides} />
      <PictureSection classmates={classmates} />
      <Footer />
    </main>
  );
}