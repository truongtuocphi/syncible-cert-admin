'use client';

import { MdNavigateNext } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname(); // Use usePathname instead of useRouter
  const paths = pathname.split('/').filter((path) => path);

  const breadcrumbItems = paths.map((path, index) => {
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
                <Link href={item.href} className="text-blue-500 hover:text-blue-700">
                  {item.label === 'admin' ? 'Home' : 'admin'}
                </Link>
                <MdNavigateNext className="text-xl" />
              </div>
            ) : (
              <Link href={item.href} className="text-gray-700">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;