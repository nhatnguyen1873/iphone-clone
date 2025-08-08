'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { VideoCarouselItem } from '@/interfaces/video-carousel-item';
import { ReplayIcon } from '@/assets/icons/replay-icon';
import { PlayIcon } from '@/assets/icons/play-icon';
import { PauseIcon } from '@/assets/icons/pause-icon';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export interface VideoCarouselProps {
  videos: VideoCarouselItem[];
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(
    () => {
      gsap.to('#slider', {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease: 'power2.inOut',
      });

      gsap.to('#video', {
        scrollTrigger: {
          trigger: '#video',
          toggleActions: 'restart none none none',
        },
        onComplete: () => {
          setVideo((pre) => ({
            ...pre,
            startPlay: true,
            isPlaying: true,
          }));
        },
      });
    },
    {
      dependencies: [isEnd, videoId],
    },
  );

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: `var(--active-size)`,
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: 'var(--size)',
            });
            gsap.to(span[videoId], {
              backgroundColor: 'var(--color-gray-200)',
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      const animUpdate = () => {
        if (!videoRef.current[videoId]) return;

        anim.progress(
          videoRef.current[videoId].currentTime / videos[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }

    // TODO: optimize dependencies
  }, [videoId, startPlay]);

  useEffect(() => {
    const currentVideo = videoRef.current[videoId];

    if (currentVideo) {
      if (startPlay && isPlaying && currentVideo.readyState >= 1) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [isPlaying, startPlay, videoId]);

  const handleProcess = (
    type: 'video-end' | 'video-last' | 'video-reset' | 'pause' | 'play',
    i?: number,
  ) => {
    switch (type) {
      case 'video-end':
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: (i ?? 0) + 1 }));
        break;

      case 'video-last':
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case 'video-reset':
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case 'pause':
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case 'play':
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex h-[30rem] gap-10 overflow-x-scroll px-(--padding-horizontal) [--padding-horizontal:max((100vw-var(--spacing-media-gallery-fluid))/2,(100vw-var(--spacing-media-gallery-max))/2)] [scrollbar-width:none]'>
        {videos.map((video, i) => (
          <div
            key={video.id}
            id='slider'
            className='w-media-gallery-fluid max-w-media-gallery-max relative h-full shrink-0 overflow-hidden rounded-[1.75rem]'
          >
            <video
              id='video'
              playsInline
              className={`pointer-events-none h-full w-full object-cover`}
              preload='auto'
              muted
              ref={(el) => {
                videoRef.current[i] = el;
              }}
              onEnded={() => {
                if (i !== videos.length - 1) {
                  handleProcess('video-end', i);
                } else {
                  handleProcess('video-last');
                }
              }}
              onPlay={() => {
                setVideo((pre) => ({ ...pre, isPlaying: true }));
              }}
            >
              <source src={video.video} type='video/mp4' />
            </video>

            <p className='absolute top-8 z-10 text-base font-semibold max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:text-center md:top-11 md:text-2xl lg:left-11 xl:top-12 xl:left-12 xl:text-[1.75rem]'>
              {video.textLists.map((text, i) => (
                <Fragment key={i}>
                  {text}
                  {i !== video.textLists.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div className='sticky inset-y-7.5 flex items-center justify-center gap-4'>
        <button
          onClick={() => {
            if (isLastVideo) {
              handleProcess('video-reset');
            } else if (!isPlaying) {
              handleProcess('play');
            } else {
              handleProcess('pause');
            }
          }}
          className='backdrop-blur-common flex cursor-pointer items-center justify-center rounded-full bg-gray-300 p-4 backdrop-saturate-180'
        >
          {isLastVideo ? (
            <ReplayIcon />
          ) : !isPlaying ? (
            <PlayIcon />
          ) : (
            <PauseIcon />
          )}
        </button>

        <div className='backdrop-blur-common flex min-h-14 items-center justify-center gap-4 rounded-full bg-gray-300 px-7 py-5 backdrop-saturate-180'>
          {videoRef.current.map((_, i) => (
            <div
              key={i}
              className='relative size-(--size) cursor-pointer overflow-hidden rounded-(--dot-radius) bg-gray-200 [--active-size:2rem] [--dot-radius:0.625rem] [--size:0.5rem] md:[--active-size:3rem]'
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
            >
              <div
                className='absolute inset-0 rounded-(--dot-radius)'
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
