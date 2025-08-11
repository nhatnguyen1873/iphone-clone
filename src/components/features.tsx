'use client';

import { GlobalSection } from '@/components/global-section';
import {
  SectionHeading,
  type SectionHeadingRef,
} from '@/components/section-heading';
import {
  TextHighlight,
  TextHighlightMain,
} from '@/components/ui/text-highlight';
import { animateInView } from '@/utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '@/utils/media';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';

export const Features = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<SectionHeadingRef>(null);

  useGSAP(() => {
    animateInView(
      videoRef.current,
      {
        onComplete: () => {
          videoRef.current?.play();
        },
      },
      {
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
    );

    animateInView(headingRef.current, {
      opacity: 1,
      y: 0,
    });

    animateInView(
      '.g_grow',
      {
        scale: 1,
        opacity: 1,
        ease: 'power1',
      },
      {
        scrub: 5.5,
      },
    );

    animateInView('.g_text', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <GlobalSection className='px-media-gallery-padding flex flex-col gap-32'>
      <SectionHeading
        id='features-title'
        ref={headingRef}
        className='translate-y-20 opacity-0'
      >
        Explore the full story.
      </SectionHeading>

      <div className='flex flex-col items-center gap-24'>
        <div className='pl-24'>
          {['iPhone.', 'Forged in titanium.'].map((item, index) => (
            <h2 key={index} className='text-5xl font-semibold lg:text-7xl'>
              {item}
            </h2>
          ))}
        </div>

        <div className='flex flex-col sm:px-10'>
          <video
            ref={videoRef}
            playsInline
            autoPlay
            muted
            className='h-[50vh] w-full object-cover'
          >
            <source src={exploreVideo} type='video/mp4' />
          </video>

          <div className='flex flex-col gap-10 md:gap-16'>
            <div className='flex flex-col gap-5 md:flex-row'>
              {[
                { src: explore1Img, alt: 'titanium' },
                { src: explore2Img, alt: 'titanium 2' },
              ].map((item, index) => (
                <div
                  key={index}
                  className='h-[50vh] grow basis-0 overflow-hidden'
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    className='g_grow h-full w-full scale-150 object-cover opacity-0'
                  />
                </div>
              ))}
            </div>

            <div className='flex flex-col gap-5 md:flex-row'>
              {[
                {
                  id: 1,
                  beforeHighlight: 'iPhone 15 Pro is ',
                  highlightText:
                    'the first iPhone to feature an aerospace-grade titanium design',
                  afterHighlight:
                    ', using the same alloy that spacecrafts use for missions to Mars.',
                },
                {
                  id: 2,
                  beforeHighlight:
                    'Titanium has one of the best strength-to-weight ratios of any metal, making these our ',
                  highlightText: 'lightest Pro models ever.',
                  afterHighlight:
                    " You'll notice the difference the moment you pick one up.",
                },
              ].map((item) => (
                <div key={item.id} className='grow'>
                  <TextHighlight
                    key={item.id}
                    className='g_text max-w-md translate-y-20 opacity-0'
                  >
                    {item.beforeHighlight}
                    <TextHighlightMain>{item.highlightText}</TextHighlightMain>
                    {item.afterHighlight}
                  </TextHighlight>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlobalSection>
  );
};
