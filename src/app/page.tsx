import { Hero } from '@/components/hero';
import { Highlights } from '@/components/highlights';
import { Header } from '@/components/layouts/header';
import { Model } from '@/components/model';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>
        <Hero />
        <Highlights />
        <Model />
      </main>
    </div>
  );
}
