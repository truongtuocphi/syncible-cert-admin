'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="text-2xl font-bold">Loading...</div>
  </div>
);

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (!isClient || status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="hidden w-1/2 items-center justify-center bg-gray-200 md:block">
        {/* <img src="/#" alt="Login Image" className="h-full w-full object-cover" /> */}
      </div>
      {/* Right login form */}
      <div className="flex w-full items-center justify-center bg-white p-6 md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-2xl font-bold">Login</h1>
          <button
            onClick={() => signIn('google')}
            className="mb-2 flex w-full items-center justify-center rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
