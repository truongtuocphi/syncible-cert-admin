import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import AuthorProfile from '@/components/common/miscellaneus/AuthorProfile';

export default function BlogCard({ entry }: { entry: ArticleEntry }) {
  return (
    <Card className="h-full overflow-hidden rounded-[1.25rem] border-[#F0F0F0] bg-white/80 shadow-none backdrop-blur-[50px]">
      <CardHeader>
        <div className="max-h-40 w-full overflow-hidden rounded-xl">
          <Image
            src={entry.bannerImg || '/SyncibleSmallerBanner.png'}
            alt="Banner photo of the blog post"
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-[2/1] object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-3 h-32 font-bold leading-[2rem]">
          <Link href={entry.link} className="hover:underline">
            {entry.title}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter>
        <AuthorProfile author={entry.author} />
        {/* <div className="flex w-full gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full shrink-0">
            <Image
              className="h-full w-full"
              src={entry.author.avatar}
              alt={entry.author.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex w-full flex-col justify-center">
            <div className="text-lg font-bold">{entry.author.name}</div>
            <div className="text-base font-medium text-[#A2A3A9]">{entry.author.position}</div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
}
