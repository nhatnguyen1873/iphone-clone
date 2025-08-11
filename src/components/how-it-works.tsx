'use client';

import { GlobalSection } from '@/components/global-section';
import { TextHighlightMain } from '@/components/ui/text-highlight';
import { TextHighlight } from '@/components/ui/text-highlight/text-highlight';
import { animateInView } from '@/utils/animations';
import { chipImg, frameImg, frameVideo } from '@/utils/media';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

export const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const chipImgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    animateInView(chipImgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.inOut',
    });

    animateInView('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });

    gsap.to(videoRef.current, {
      scrollTrigger: {
        trigger: videoRef.current,
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });
  }, []);

  return (
    <GlobalSection className='px-media-gallery-padding flex flex-col gap-10 md:gap-20'>
      <div className='flex flex-col items-center gap-20'>
        <Image
          ref={chipImgRef}
          src={chipImg}
          alt='chip'
          className='size-[180px] scale-200 object-cover opacity-0'
        />
        <div className='flex flex-col gap-10'>
          <h2 className='text-center text-4xl font-semibold md:text-7xl'>
            A17 Pro chip.
            <br />A monster win for gaming.
          </h2>
          <p className='text-gray text-center text-xl font-semibold md:text-2xl'>
            It&apos;s here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-14'>
        <div className='flex flex-col items-center gap-3'>
          <div className='relative flex items-center justify-center'>
            <Image src={frameImg} alt='frame' className='z-10' />

            <video
              ref={videoRef}
              playsInline
              preload='none'
              muted
              autoPlay
              className='pointer-events-none absolute h-[90%] w-[95%] rounded-[56px]'
            >
              <source src={frameVideo} type='video/mp4' />
            </video>
          </div>
          <p className='text-gray text-center font-semibold'>
            Honkai: Star Rail
          </p>
        </div>

        <div className='flex flex-col justify-between gap-24 md:flex-row'>
          <div className='grow basis-0'>
            {[
              {
                id: 1,
                beforeHighlight:
                  'A17 Pro is an entirely new class of iPhone chip that delivers our ',
                highlightText: 'best graphic performance by far',
                afterHighlight: '.',
              },
              {
                id: 2,
                beforeHighlight: 'Mobile ',
                highlightText: 'games will look and feel so immersive',
                afterHighlight:
                  ', with incredibly detailed environments and characters.',
              },
            ].map((item) => (
              <TextHighlight
                key={item.id}
                className='g_fadeIn translate-y-20 opacity-0'
              >
                {item.beforeHighlight}
                <TextHighlightMain>{item.highlightText}</TextHighlightMain>
                {item.afterHighlight}
              </TextHighlight>
            ))}
          </div>

          <div className='g_fadeIn flex grow basis-0 translate-y-20 flex-col gap-2 opacity-0'>
            <TextHighlight>New</TextHighlight>
            <p className='text-3xl font-normal text-white md:text-5xl md:font-semibold'>
              Pro-class GPU
            </p>
            <TextHighlight>with 6 cores</TextHighlight>
          </div>
        </div>
      </div>
    </GlobalSection>
  );
};
