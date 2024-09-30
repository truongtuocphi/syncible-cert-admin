import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BlogCardSkeleton: React.FC = () => {
    return (
        <div className="p-4 border rounded-lg shadow-md max-w-sm w-full mx-auto">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
};
