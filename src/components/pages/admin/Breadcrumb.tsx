import Link from 'next/link';

interface BreadcrumbProps {
  items: { name: string; href?: string }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="text-blue-500 hover:underline">
                {item.name}
              </Link>
            ) : (
              <span>{item.name}</span>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
