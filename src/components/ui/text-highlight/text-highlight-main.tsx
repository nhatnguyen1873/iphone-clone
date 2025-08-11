import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextHighlightMainRef = HTMLSpanElement;

type TextHighlightMainProps = DetailedHTMLProps<
  HTMLAttributes<TextHighlightMainRef>,
  TextHighlightMainRef
>;

export const TextHighlightMain = (props: TextHighlightMainProps) => {
  return <span {...props} className={twMerge('text-white', props.className)} />;
};
