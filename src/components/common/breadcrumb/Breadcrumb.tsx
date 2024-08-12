'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import getCustomLabel from '@/utils/labelCustomization';

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path);

  const isAdminMintNFTPath = pathname === '/admin/mintnft';

  const breadcrumbItems = paths
    .filter((path, index) => {
      if (isAdminMintNFTPath && index === 0 && path.toLowerCase() === 'admin') {
        return false;
      }
      return true;
    })
    .map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;

      const label = getCustomLabel(path);

      const truncatedLabel = path.length > 19 ? `${path.slice(0, 3)}...${path.slice(-3)}` : label;

      return { label: truncatedLabel, href };
    });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-500">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index < breadcrumbItems.length - 1 ? (
              <div className="flex items-center gap-2">
                <Link href={item.href} className="text-sm">
                  {capitalizeFirstLetter(item.label)}
                </Link>
                <MdNavigateNext className="text-xl" />
              </div>
            ) : (
              <Link href={item.href} className="text-sm text-gray-700">
                {capitalizeFirstLetter(item.label)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
