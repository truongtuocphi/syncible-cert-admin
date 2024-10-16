import { Link } from '@/i18n/routing';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';

interface breadcrumbItems {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: breadcrumbItems[];
}

export default function BlogBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-[#A2A3A9]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-[#2C2C2C] line-clamp-1">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-2 [&_path]:stroke-current"><ArrowNarrowRight className="stroke-[#A2A3A9] h-4 w-4" /></span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
