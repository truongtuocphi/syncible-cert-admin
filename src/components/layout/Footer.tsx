import Link from 'next/link';

import FacebookIcon from '@/assets/icons/FacebookIcon.svg';
import InstagramIcon from '@/assets/icons/InstagramIcon.svg';
import LinkedInIcon from '@/assets/icons/LinkedinIcon.svg';
import TwitterIcon from '@/assets/icons/TwitterIcon.svg';
import YoutubeIcon from '@/assets/icons/YoutubeIcon.svg';

const listSocialMedia = [
  {
    link_name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icon: <LinkedInIcon className="lg:h-6 lg:w-6 " />,
  },
  {
    link_name: 'Twitter',
    url: 'https://twitter.com/',
    icon: <TwitterIcon className="lg:h-6 lg:w-6" />,
  },
  {
    link_name: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: <FacebookIcon className="lg:h-6 lg:w-6" />,
  },
  {
    link_name: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: <InstagramIcon className="lg:h-6 lg:w-6" />,
  },
  {
    link_name: 'Youtube',
    url: 'https://www.youtube.com/',
    icon: <YoutubeIcon className="lg:h-6 lg:w-6" />,
  },
];

const Links = [
  { link_name: 'Điều khoản', url: '/' },
  { link_name: 'Bảo mật', url: '/' },
  { link_name: 'Liên hệ', url: '/contact' },
];

const Footer = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full max-w-[90rem]">
        <div className="px-6 md:px-8 xl:px-24">
          <div className="flex flex-col items-center justify-between px-6 py-6 lg:flex-row">
            <div>@ 2024 Syncible. All rights reserved</div>
            <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-6">
              {Links.map(({ link_name, url }) => (
                <Link href={url} key={link_name}>
                  <div className="py-3 text-xs md:text-base">{link_name}</div>
                </Link>
              ))}
              <div className="hidden h-4 border-l border-[#2C2C2C] lg:block"></div>
              <div className="flex items-center gap-5">
                {listSocialMedia.map(({ link_name, url, icon }) => {
                  return (
                    <Link key={link_name} href={url}>
                      <div className="cursor-pointer">{icon}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Footer;
