'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/common/loading/Loading';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/explorer');
  }, []);

  return <Loading />;
}
