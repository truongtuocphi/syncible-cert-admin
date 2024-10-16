import Image from 'next/image';

export default function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="flex w-full gap-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
        <Image
          className="h-full w-full"
          src={author.avatar_url} 
          alt={author.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-lg font-bold">{author.name}</div>
        <div className="text-base font-medium text-[#A2A3A9]">{author.description}</div>
      </div>
    </div>
  );
}
