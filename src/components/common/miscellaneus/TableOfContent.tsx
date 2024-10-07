import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { useState, useEffect, Key } from 'react';

export default function TableOfContent({ headings }: { headings: any }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      headings.forEach((heading: any) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 4; // Check if the element is within one fourth of the screen

          if (isVisible) {
            setActiveId(heading.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount in case some headings are in view initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);
  
  return (
    <ul>
      {headings.map((heading: any, index: Key | null | undefined) => (
        <li key={index} className="pt-2">
          <Link
            key={index}
            href={`#${heading.id}`}
            className={clsx(
              'hover:text-[#2C2C2C] hover:no-underline focus:no-underline',
              activeId === heading.id ? 'text-[#2C2C2C] font-bold' : 'text-[#A2A3A9] font-medium'
            )}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(`#${heading.id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {heading.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
