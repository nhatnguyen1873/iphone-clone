import type { HTMLAttributes, RefAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type SectionHeadingRef = HTMLHeadingElement;

export type SectionHeadingProps = HTMLAttributes<SectionHeadingRef> &
  RefAttributes<SectionHeadingRef>;

export const SectionHeading = (props: SectionHeadingProps) => {
  return (
    <h1
      {...props}
      className={twMerge(
        'text-headline-text text-[1.75rem] font-semibold md:text-5xl xl:text-[3.5rem]',
        props.className,
      )}
    />
  );
};
