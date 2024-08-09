'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

import capitalizeFirstLetter from '@/lib/capitalizeFirstLetter';

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((path) => path);

  // Kiểm tra xem đường dẫn có phải là /admin/mintnft hay không
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
      return { label: path, href };
    });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-500">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index < breadcrumbItems.length - 1 ? (
              <div className="flex items-center gap-2">
                <Link href={item.href}>
                  {`${item.label === 'admin' ? 'Home' : capitalizeFirstLetter(item.label)}`}
                </Link>
                <MdNavigateNext className="text-xl" />
              </div>
            ) : (
              <Link href={item.href} className="text-gray-700">
                {`${item.label === 'admin' ? 'Home' : capitalizeFirstLetter(item.label)}`}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
