import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';
import * as THREE from 'three';
gsap.registerPlugin(ScrollTrigger);

export const animateInView = (
  target: gsap.DOMTarget,
  animationProps: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars,
) => {
  return gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: RefObject<THREE.Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars,
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );
};
