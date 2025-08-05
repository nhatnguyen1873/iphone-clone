import type { SVGAttributes } from 'react';

export type PauseIconProps = SVGAttributes<SVGSVGElement>;

export const PauseIcon = (props: PauseIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#ffffff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <rect width='4' height='16' x='6' y='4' />
      <rect width='4' height='16' x='14' y='4' />
    </svg>
  );
};
