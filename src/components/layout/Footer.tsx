import Link from 'next/link';

import { AlphaTrueLogoBlueIcon, AlphaTrueLogoWhiteIcon } from '@/assets/icons';

import EmailIcon from '../icons/EmailIcon';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedinlIcon from '../icons/LinkedinIcon';
import TwitterIcon from '../icons/TwitterIcon';
import WebIcon from '../icons/WebIcon';

const listSocialMedia = [
  { link: '/#', icon: <WebIcon /> },
  { link: '/#', icon: <TwitterIcon /> },
  { link: '/#', icon: <LinkedinlIcon /> },
  { link: '/#', icon: <FacebookIcon /> },
  { link: '/#', icon: <EmailIcon /> },
];

const Footer = () => {
  return (
    <footer className="mt-56 flex items-center px-4 py-4 md:px-8 xl:px-24">
      <div className="flex items-center gap-5">
        {listSocialMedia.map(({ link, icon }, index) => {
          return (
            <Link href={link} key={index}>
              {icon}
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
