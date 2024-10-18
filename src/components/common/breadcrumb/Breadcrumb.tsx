'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useCustomLabel } from '@/utils/labelCustomization';

interface propData {
  displayName?: string;
  nameCertificate?: string;
}

const Breadcrumb = ({ displayName, nameCertificate }: propData) => {
  const pathname = usePathname();

  const paths = pathname ? pathname.split('/').filter((path) => path) : [];

  const isAdminMintNFTPath = pathname === '/admin/mintnft';

  // Generate labels for each path
  

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-gray-400">
      {paths
          .filter((path, index) => {
            if (isAdminMintNFTPath && index === 0 && path.toLowerCase() === 'admin') {
              return false;
            }
            return true;
          })
          .map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;

            // Call `useCustomLabel` individually here, outside of any callback functions
            let label = useCustomLabel(path);

            // Handle specific conditions for path lengths
            if (path.length === 42) {
              label = displayName || 'Loading...';
            }

            if (path.length === 46 && nameCertificate) {
              label = nameCertificate || 'Loading...';
            }

            const truncatedLabel = label.length > 41 ? `${displayName}` : label;

            return (
              <li key={href} className="flex items-center text-sm 2xl:text-base">
                {index < paths.length - 1 ? (
                  <div className="flex items-center gap-2">
                    {truncatedLabel && (
                      <>
                        <Link
                          href={href}
                          className="line-clamp-1 text-sm hover:text-gray-800 2xl:text-base"
                        >
                          {capitalizeFirstLetter(truncatedLabel)}
                        </Link>
                        <MdNavigateNext className="mr-2 text-xl" />
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href={href}
                    className="text-sm font-bold text-gray-600 hover:text-gray-800 2xl:text-base"
                  >
                    {capitalizeFirstLetter(truncatedLabel)}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};


export default Breadcrumb;
