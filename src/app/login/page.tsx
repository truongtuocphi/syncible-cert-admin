'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { GoogleIcon } from '@/assets/icons';
import { auth, provider, signInWithPopup } from '@/lib/firebase';

import Banner_login from '../../../public/banner_login.png';

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="text-2xl font-bold">Loading...</div>
  </div>
);

export default function Login() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-2/5 items-center justify-center bg-[#F5F7FF] p-4 md:flex md:flex-col">
        <Image src={Banner_login} alt="Login Image" className="size-64 object-cover" priority />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">Award students NFT Certificates!</h2>
          <p className="mt-2 text-gray-500">
            School members can initiate and approve the creation of NFT Certificates for qualified
            students.
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex w-full items-center justify-center bg-white p-3 text-black md:w-3/5 lg:p-6">
        <div className="mx-auto w-full max-w-lg p-6">
          <h1 className="mb-6 text-center text-2xl font-bold">Sign in to Syncible!</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-left font-semibold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter E-mail"
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-orange-600" />
                <span className="ml-2">Stay logged in</span>
              </label>
              <a href="/forgot-password" className="text-indigo-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-500 py-2 text-white hover:bg-indigo-600"
            >
              Sign In
            </button>
          </form>
          <button
            onClick={handleLogin}
            className={`mb-2 mt-4 flex w-full items-center justify-center rounded-full border-[1px] border-gray-300 px-4 py-2 text-black shadow-lg hover:bg-gray-200 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading}
          >
            <GoogleIcon className="mr-2 size-5" />
            {loading ? 'Loading...' : 'Sign in with Google'}
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm">
              If you have not registered yet,{' '}
              <a href="/sign-up" className="text-indigo-500 hover:underline">
                Sign up today!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
