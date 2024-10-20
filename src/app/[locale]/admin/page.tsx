import Card from '@/components/pages/admin/Card';
import { BiFile } from 'react-icons/bi';
import { BiCustomize } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';
import { useTranslations } from 'next-intl';

//Custom, Mint, collection
const listCard = [
  {
    title: 'title',
    des: 'p',
    icon: <BiFile className="text-2xl text-gray-800 2xl:text-3xl" />,
    titleButton: 'button',
    link: '/admin/customized',
  },
  {
    title: 'title',
    des: 'p',
    icon: <BiCustomize className="text-2xl text-gray-800 2xl:text-3xl" />,
    titleButton: 'button',
    link: '/admin/collection',
  },
  {
    title: 'title',
    des: 'p',
    icon: <GrCertificate className="text-2xl text-gray-800 2xl:text-3xl" />,
    titleButton: 'button',
    link: '/admin/mintnft',
  },
];

const HomeAdmin = () => {
  const t = useTranslations('Dapp');

  return (
    <div className="flex w-full flex-col">
      <div className="mt-3">
        <h1 className="mb-3 text-3xl font-bold text-gray-700 2xl:text-4xl">{t('welcom.title')}</h1>
        <p className="text-sm font-semibold text-gray-500 2xl:text-base">{t('welcom.p')}</p>
      </div>
      <div className="mt-8 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {listCard.map((item, index) => {
          return <Card data={item} numberIndex={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HomeAdmin;
