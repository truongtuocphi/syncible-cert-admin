import { FaRegFileAlt } from 'react-icons/fa';
import { GiDiploma } from 'react-icons/gi';
import { MdCollectionsBookmark } from 'react-icons/md';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import Card from '@/components/pages/admin/Card';

const listCard = [
  {
    title: 'File Storage',
    des: 'Efficiently manage your files here',
    icon: <FaRegFileAlt className="text-2xl text-white" />,
    titleButton: 'Enter',
    link: '/admin/filestorage',
  },
  {
    title: 'NFT Collection',
    des: 'Manage your minted NFT Certificate here',
    icon: <MdCollectionsBookmark className="text-2xl text-white" />,
    titleButton: 'Enter',
    link: '/admin/collection',
  },
  {
    title: 'Customized Certificate',
    des: 'Edit the look and specialize your own theme. Add your logo, colors, and images to reflect your brand.',
    icon: <MdOutlineDashboardCustomize className="text-2xl text-white" />,
    titleButton: 'Customized here',
    link: '/admin',
  },
  {
    title: 'Mint NFT',
    des: 'Create and mint  your NFT certificate',
    icon: <GiDiploma className="text-2xl text-white" />,
    titleButton: 'Mint here',
    link: '/admin/mintnft',
  },
];

const HomeAdmin = () => {
  return (
    <>
      <div>
        <h1 className="mb-3 text-3xl font-bold text-gray-700">Welcome to Syncible, </h1>
        <p className="text-sm font-semibold text-gray-400">
          Create your own certificate in an easier way with the steps below
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listCard.map((item, index) => {
          return <Card data={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default HomeAdmin;
