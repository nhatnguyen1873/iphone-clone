'use client';

import { CtaLink } from '@/components/cta-link';
import { SectionHeading } from '@/components/section-heading';
import { WatchIcon } from '@/assets/icons/watch-icon';
import { RightIcon } from '@/assets/icons/right-icon';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { type ReactNode } from 'react';
import type { LinkProps } from 'next/link';
import { VideoCarousel } from '@/components/video-carousel';
import { highlightsSlides } from '@/constants/data';
import { GlobalSection } from '@/components/global-section';

export const Highlights = () => {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1,
      transform: 'translateY(0)',
      duration: 0.8,
    });

    gsap.to('.cta-link', {
      opacity: 1,
      transform: 'translateY(0)',
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <GlobalSection className='bg-zinc flex flex-col gap-12 md:gap-16 lg:gap-20'>
      <div className='w-media-gallery-fluid max-w-media-gallery-max mx-auto flex justify-between max-md:flex-col max-md:gap-4 md:items-end'>
        <SectionHeading id='title' className='translate-y-20 opacity-0'>
          Get the highlights.
        </SectionHeading>

        <div className='flex gap-5'>
          {(
            [
              {
                id: 1,
                href: '#',
                text: 'Watch the film',
                icon: <WatchIcon className='size-3.5 md:size-4' />,
              },
              {
                id: 2,
                href: '#',
                text: 'Watch the event',
                icon: <RightIcon className='size-3.5 md:size-4' />,
              },
            ] as {
              id: number;
              href: LinkProps<string>['href'];
              text: string;
              icon: ReactNode;
            }[]
          ).map((item) => (
            <CtaLink
              key={item.id}
              href={item.href}
              className='cta-link translate-y-20 opacity-0'
            >
              {item.text}
              {item.icon}
            </CtaLink>
          ))}
        </div>
      </div>

      <VideoCarousel videos={highlightsSlides} />
    </GlobalSection>
  );
};
