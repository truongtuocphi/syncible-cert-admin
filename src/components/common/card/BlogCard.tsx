import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface ArticaleEntry {
  title: string;
  link: string;
  author: {
    name: string;
    avatar: string;
    position: string;
  };
}

export default function BlogCard({ entry }: { entry: ArticaleEntry }) {
  return (
    <Card className="h-full overflow-hidden rounded-[1.25rem] border-[#F0F0F0]  bg-white/80 shadow-none">
      <CardHeader>
        <div className="max-h-40 w-full overflow-hidden rounded-xl">
          <Image
            src="/SyncibleSmallerBanner.png"
            alt="placeholder photo"
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-[2/1] object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-3 h-32 font-bold leading-[2rem]">
          <Link href={entry.link} className="hover:underline">{entry.title}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-4">
          <Avatar className="flex items-center h-16 w-16">
            <AvatarImage src={entry.author.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={` flex w-full flex-col justify-center`}>
            <div className="text-lg font-bold">{entry.author.name}</div>
            <div className="text-base font-medium text-[#A2A3A9]">{entry.author.position}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
