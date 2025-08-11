import { CtaLink, type CtaLinkProps } from '@/components/cta-link';
import { footerLinks } from '@/constants/data';
import Link, { type LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Footer = () => {
  return (
    <footer className='bg-[#1d1d1f] py-3 text-white/56'>
      <div className='max-w-content-max px-content-padding mx-auto flex flex-col gap-4'>
        <div className='md:border-b md:border-white/24 md:pb-4'>
          <p className='text-xs'>
            More ways to shop:{' '}
            <FooterCtaLink href='#'>Find an Apple Store</FooterCtaLink> or{' '}
            <FooterCtaLink href='#'>other retailer</FooterCtaLink> near you. Or
            call <FooterCtaLink href='#'>1-800-MY-APPLE</FooterCtaLink>{' '}
            (1-800-692-7753).
          </p>
        </div>

        <div className='flex flex-col-reverse max-md:gap-3 md:flex-row md:justify-between'>
          <div className='flex flex-col gap-1.5 md:flex-row md:gap-7.5'>
            <p className='text-xs'>
              Copyright @ 2025 Apple Inc. All rights reserved.
            </p>
            <ul className='flex flex-wrap gap-2'>
              {footerLinks.map((link, index) => (
                <li key={link} className='flex items-center gap-2'>
                  <FooterLink href='#'>{link}</FooterLink>
                  {index !== footerLinks.length - 1 && (
                    <span className='h-2.5 w-[1px] bg-white/40' />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <FooterLink href='#'>United States</FooterLink>
        </div>
      </div>
    </footer>
  );
};

function FooterCtaLink(props: CtaLinkProps) {
  return (
    <CtaLink
      {...props}
      className={twMerge(
        'inline text-[length:inherit] underline',
        props.className,
      )}
    />
  );
}

function FooterLink<T>(props: LinkProps<T>) {
  return (
    <Link
      {...props}
      className={twMerge(
        'text-xs text-white/80 hover:underline',
        props.className,
      )}
    />
  );
}
