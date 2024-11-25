import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { useState, useEffect, Key } from 'react';

export default function TableOfContent({ headings }: { headings: any }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [baseHeadingLevel, setBaseHeadingLevel] = useState<number | null>(null);

  useEffect(() => {
    if (headings.length > 0) {
      const smallestHeading = Math.min(
        ...headings.map((heading: any) => parseInt(heading.tagName[1]))
      );
      setBaseHeadingLevel(smallestHeading);
    }
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      headings.forEach((heading: any) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 4;

          if (isVisible) {
            setActiveId(heading.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const getIndentation = (tagName: string) => {
    const headingLevel = parseInt(tagName[1]);
    if (baseHeadingLevel !== null) {
      const levelDifference = headingLevel - baseHeadingLevel;
      return `ml-${levelDifference * 1}`;
    }
    return 'ml-0';
  };

  //text size corresponding to the heading tag
  const getTextSize = (tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    const sizeMap = {
      h1: 'text-[20px]', // 20px for h1
      h2: 'text-[18px]', // 18px for h2
      h3: 'text-[18px]', // 18px for h3
      h4: 'text-[18px]', // 18px for h4
      h5: 'text-[16px]', // 16px for h5
      h6: 'text-[16px]', // 16px for h6
    };
    return sizeMap[tagName] || 'text-[16px]';
  };

  return (
    <ul>
      {headings.map((heading: any, index: Key | null | undefined) => (
        <li key={index} className={clsx('pt-2', getIndentation(heading.tagName))}>
          <Link
            key={index}
            href={`#${heading.id}`}
            className={clsx(
              'hover:text-[#2C2C2C] hover:no-underline focus:no-underline',
              activeId === heading.id ? 'font-bold text-[#2C2C2C]' : 'font-medium text-[#A2A3A9]',
              getTextSize(heading.tagName)
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
