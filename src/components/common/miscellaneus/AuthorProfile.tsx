import Image from 'next/image';

interface Author {
  name: string;
  avatar: string;
  position: string;
}

export default function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="flex w-full gap-4">
      <div className="retalive h-16 w-16 shrink-0 overflow-hidden rounded-full">
        <Image
          className="h-full w-full"
          src={author.avatar}
          alt={author.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-lg font-bold">{author.name}</div>
        <div className="text-base font-medium text-[#A2A3A9]">{author.position}</div>
      </div>
    </div>
  );
}
