import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type GlobalSectionProps = HTMLAttributes<HTMLDivElement>;

export const GlobalSection = (props: GlobalSectionProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        'pt-24 pb-49 md:pt-32 md:pb-51.5 xl:pt-40 xl:pb-54',
        props.className,
      )}
    />
  );
};
