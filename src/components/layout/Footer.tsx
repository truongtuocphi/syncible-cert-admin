import Link from 'next/link';

import { useTranslations } from 'next-intl';
import FacebookIcon from '@/assets/icons/FacebookIcon.svg';
import InstagramIcon from '@/assets/icons/InstagramIcon.svg';
import LinkedInIcon from '@/assets/icons/LinkedinIcon.svg';
import TwitterIcon from '@/assets/icons/TwitterIcon.svg';
import YoutubeIcon from '@/assets/icons/YoutubeIcon.svg';


const listSocialMedia = [
  {
    link_name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    icon: <LinkedInIcon className="h-full w-full" />,
  },
  {
    link_name: 'Twitter',
    url: 'https://twitter.com/',
    icon: <TwitterIcon className="h-full w-full" />,
  },
  {
    link_name: 'Facebook',
    url: 'https://www.facebook.com/',
    icon: <FacebookIcon className="h-full w-full" />,
  },
  {
    link_name: 'Instagram',
    url: 'https://www.instagram.com/',
    icon: <InstagramIcon className="h-full w-full" />,
  },
  {
    link_name: 'Youtube',
    url: 'https://www.youtube.com/',
    icon: <YoutubeIcon className="h-full w-full" />,
  },
];

const Footer = () => {
  const t = useTranslations('HomePage');
  const Links = [
    {
      link_name: t('navigation.footer.links.term_of_service.label'),
      url: t('navigation.footer.links.term_of_service.href'),
    },
    {
      link_name: t('navigation.footer.links.privacy_policy.label'),
      url: t('navigation.footer.links.privacy_policy.href'),
    },
    {
      link_name: t('navigation.footer.links.contact.label'),
      url: t('navigation.footer.links.contact.href'),
    },
  ];

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full max-w-[90rem]">
        <div className="px-4 py-4 pb-8 md:px-8 md:py-8 xl:px-[6.5rem]">
          <div className="flex flex-col justify-between sm:items-center md:flex-row">
            <div>{t('footer_section.copy_right')}</div>
            <div className="flex flex-col gap-4 sm:items-center md:flex-row lg:gap-6">
              <div className="flex gap-8">
                {Links.map(({ link_name, url }) => (
                  <Link href={url} key={link_name}>
                    <div className="active:text- py-3 text-base">{link_name}</div>
                  </Link>
                ))}
              </div>

              <div className="hidden h-4 border-l border-[#2C2C2C] lg:block"></div>
              <div className="flex items-center gap-5">
                {listSocialMedia.map(({ link_name, url, icon }) => {
                  return (
                    <Link key={link_name} href={url}>
                      <div className="aspect-square h-6 cursor-pointer">{icon}</div>
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
