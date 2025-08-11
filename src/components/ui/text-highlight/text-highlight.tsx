import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TextHighlightRef = HTMLParagraphElement;

type TextHighlightProps = DetailedHTMLProps<
  HTMLAttributes<TextHighlightRef>,
  TextHighlightRef
>;

export const TextHighlight = (props: TextHighlightProps) => {
  return (
    <p
      {...props}
      className={twMerge(
        'text-gray text-lg font-semibold md:text-xl',
        props.className,
      )}
    />
  );
};
