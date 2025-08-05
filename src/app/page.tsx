import { Hero } from '@/components/hero';
import { Highlights } from '@/components/highlights';
import { Header } from '@/components/layouts/header';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>
        <Hero />
        <Highlights />
      </main>
    </div>
  );
}
