import Link from 'next/link';

import { AlphaTrueLogoBlueIcon, AlphaTrueLogoWhiteIcon } from '@/assets/icons';

const Footer = ({ white = false }: { white?: boolean }) => {
  return (
    <div className="px-4 text-center md:px-8 xl:px-12">
      <div>Copyright © {new Date().getFullYear()} ABAII. All rights reserved.</div>
      <div className="mt-2 flex items-center justify-center gap-1">
        Powered by{' '}
        <Link href="https://alphatrue.com" className={white ? 'h-6 w-24' : 'h-8 w-32'}>
          {white ? <AlphaTrueLogoWhiteIcon className="ml-0.5" /> : <AlphaTrueLogoBlueIcon />}
        </Link>
      </div>
    </div>
  );
};

export default Footer;
