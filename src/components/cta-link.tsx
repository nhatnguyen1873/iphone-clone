import Link, { type LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

export type CtaLinkProps<T = unknown> = LinkProps<T>;

export const CtaLink = <T,>(props: CtaLinkProps<T>) => {
  return (
    <Link
      {...props}
      className={twMerge(
        'text-blue flex items-center gap-2 text-sm hover:underline',
        props.className,
      )}
    />
  );
};
