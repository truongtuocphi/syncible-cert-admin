'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/common/loading/Loading';

export default function CollectionDetail() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/collection');
  }, []);

  return <Loading />;
}
