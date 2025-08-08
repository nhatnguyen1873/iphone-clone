'use client';

import { GlobalSection } from '@/components/global-section';
import { ModelView } from '@/components/model-view';
import { SectionHeading } from '@/components/section-heading';
import { models, sizes } from '@/constants/data';
import { yellowImg } from '@/utils/media';
import { useGSAP } from '@gsap/react';
import { View } from '@react-three/drei';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import * as THREE from 'three';
import { animateWithGsapTimeline } from '@/utils/animations';

const Canvas = dynamic(
  () => import('@react-three/fiber').then((m) => m.Canvas),
  {
    ssr: false,
  },
);

export const Model = () => {
  const [size, setSize] = useState<'small' | 'large'>('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  });

  const cameraControlSmall = useRef<OrbitControlsImpl>(null);
  const cameraControlLarge = useRef<OrbitControlsImpl>(null);

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === 'small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2,
      });
    }

    if (size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2,
      });
    }
  }, [largeRotation, size, smallRotation, tl]);

  useGSAP(() => {
    gsap.to('#heading', {
      opacity: 1,
      translateY: 0,
      duration: 0.8,
    });
  }, []);

  return (
    <GlobalSection className='flex flex-col gap-5 px-(--padding-horizontal) [--padding-horizontal:max((100vw-var(--spacing-media-gallery-fluid))/2,(100vw-var(--spacing-media-gallery-max))/2)]'>
      <SectionHeading id='heading' className='translate-y-20 opacity-0'>
        Take a closer look.
      </SectionHeading>

      <div className='flex flex-col items-center'>
        <div className='relative h-[75vh] w-full overflow-hidden md:h-[90vh]'>
          <ModelView
            index={1}
            groupRef={small}
            gsapType='view1'
            controlRef={cameraControlSmall}
            setRotationState={setSmallRotation}
            item={model}
            size={size}
          />
          <ModelView
            index={2}
            groupRef={large}
            gsapType='view2'
            controlRef={cameraControlLarge}
            setRotationState={setLargeRotation}
            item={model}
            size={size}
          />

          <Canvas
            eventSource={
              typeof window !== 'undefined' ? document.body : undefined
            }
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: 'hidden',
            }}
            className='h-full w-full'
          >
            <View.Port />
          </Canvas>
        </div>

        <div className='flex flex-col items-center gap-5'>
          <div className='flex items-center justify-center bg-black/30 px-1.5 py-1'>
            <p className='text-headline-text text-xs font-semibold'>
              {model.title}
            </p>
          </div>

          <div className='flex gap-3'>
            <ul className='backdrop-blur-common flex items-center gap-4 rounded-full bg-gray-300 px-4 py-4 backdrop-saturate-180'>
              {models.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setModel(item);
                  }}
                  style={{ backgroundColor: item.color[0] }}
                  className='size-6 cursor-pointer rounded-full'
                />
              ))}
            </ul>

            <ul className='backdrop-blur-common flex items-center gap-1 rounded-full bg-gray-300 p-1'>
              {sizes.map((item) => (
                <li
                  key={item.value}
                  onClick={() => {
                    setSize(item.value);
                  }}
                  className={twMerge(
                    'smooth-state flex size-12 cursor-pointer items-center justify-center rounded-full font-semibold text-white transition-colors',
                    size === item.value ? 'bg-white text-black' : '',
                  )}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GlobalSection>
  );
};
