import { AppleIcon } from '@/assets/icons/apple-icon';
import { BagIcon } from '@/assets/icons/bag-icon';
import { SearchIcon } from '@/assets/icons/search-icon';
import { navLists } from '@/constants/data';
import type { ReactNode } from 'react';

export const Header = () => {
  return (
    <header className='h-header-nav backdrop-blur-common sticky inset-x-0 top-0 z-50 flex shrink-0 justify-center bg-black/80 px-5 backdrop-saturate-180 md:px-10'>
      <div className='flex max-w-[1024px] grow justify-between'>
        <a href='/' className='flex items-center px-2'>
          <AppleIcon className='smooth-state size-4 opacity-80 transition-opacity hover:opacity-100' />
        </a>

        <nav className='flex gap-4 max-md:hidden'>
          {navLists.map((nav) => (
            <div
              key={nav}
              className='smooth-state flex cursor-pointer items-center px-2 text-xs opacity-80 transition-opacity hover:opacity-100'
            >
              {nav}
            </div>
          ))}
        </nav>

        <div className='flex shrink-0 gap-4'>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
          <IconWrapper>
            <BagIcon />
          </IconWrapper>
        </div>
      </div>
    </header>
  );
};

const IconWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className='smooth-state flex cursor-pointer items-center px-2 opacity-80 transition-opacity hover:opacity-100'>
      {children}
    </div>
  );
};
