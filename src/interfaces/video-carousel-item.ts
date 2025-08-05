import type { Key } from 'react';

export interface VideoCarouselItem {
  id: Key;
  textLists: string[];
  video: string;
  videoDuration: number;
}
