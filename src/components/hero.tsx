'use client';

import { HeroTitle } from '@/components/hero-title';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { heroVideo, smallHeroVideo } from '@/utils/media';
import Link from 'next/link';

export const Hero = () => {
  const isMobile = useIsMobile();
  const videoSrc =
    isMobile != null ? (isMobile ? smallHeroVideo : heroVideo) : undefined;

  useGSAP(() => {
    gsap.to('#hero-title', {
      opacity: 1,
      delay: 2,
    });

    gsap.to('#cta', {
      opacity: 1,
      delay: 2,
    });

    gsap.to('#hero-video', {
      scale: 1,
      duration: 3,
    });
  }, []);

  return (
    <section className='flex min-h-[calc(100vh-var(--spacing-header-nav))] flex-col items-center justify-center gap-6'>
      <HeroTitle id='hero-title' className='opacity-0'>
        iPhone 15 Pro
      </HeroTitle>

      <div id='hero-video' className='w-7/12 scale-110 sm:w-6/12 md:w-9/12'>
        <video
          key={videoSrc}
          autoPlay
          muted
          playsInline
          className='pointer-events-none'
        >
          <source src={videoSrc} type='video/mp4' />
        </video>
      </div>

      <div id='cta' className='flex flex-col items-center gap-7 opacity-0'>
        <Link href='#' className='cta-button'>
          Buy
        </Link>
        <p className='text-center text-lg font-semibold'>
          From $999 or $41.62/mo. for 24 mo
        </p>
      </div>
    </section>
  );
};
