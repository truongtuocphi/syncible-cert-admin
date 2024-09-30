import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { Key } from 'react';

export default function TableOfContent({ headings }: { headings: any }) {
  return (
    <ul>
      {headings.map((heading: any, index: Key | null | undefined) => (
        <li key={index}>
          <Link
            key={index}
            href={`#${heading.id}`}
            className={clsx(
              'hover:text-[#2C2C2C] hover:underline'
              //   pathname === t(`navigation.${key}.href`) && 'text-[#2C2C2C]'
            )}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(`#${heading.id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {heading.value}
          </Link>
        </li>
      ))}
    </ul>
  );
}
