import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';

export const BlogCardSkeleton: React.FC = () => {
    return (
        <Card className="h-full overflow-hidden rounded-[1.25rem] border-[#F0F0F0] bg-white/80 shadow-none backdrop-blur-[50px]">
            <CardHeader>
            <div className="max-h-40 w-full overflow-hidden rounded-xl">
                <Skeleton className="aspect-[2/1] object-cover w-96" />
            </div>
            </CardHeader>
            <CardContent>
            <CardTitle className="line-clamp-3 h-32 font-bold leading-[2rem]">
                <Skeleton className="h-6 w-2/3" />
            </CardTitle>
            </CardContent>
            <CardFooter>
            <div className="flex w-full gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full shrink-0">
                <Skeleton className="h-full w-full" />
                </div>
                <div className="flex w-full flex-col justify-center">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
            </CardFooter>
        </Card>
        
    );
};
