import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type HeroTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const HeroTitle = (props: HeroTitleProps) => {
  return (
    <p
      {...props}
      className={twMerge(
        'text-center text-3xl font-semibold text-gray-100',
        props.className,
      )}
    />
  );
};
