'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { GoogleIcon } from '@/assets/icons';
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  provider,
} from '@/lib/firebase';

import Banner_login from '../../../public/banner_login.png';

const Loading = () => (
  <div className="flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
  </div>
);

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Loading will be handled by the useEffect hook
    } catch (error) {
      setLoading(false);
      setError('Invalid credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      // Loading will be handled by the useEffect hook
    } catch (error) {
      setLoading(false);
      setError('Failed to sign in with Google.');
    }
  };

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

      <div className="flex w-full items-center justify-center bg-white p-3 text-black md:w-3/5 lg:p-6">
        <div className="mx-auto w-full max-w-lg p-6">
          <h1 className="mb-6 text-center text-2xl font-bold">Sign in to Syncible!</h1>
          {loading && <Loading />}
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left font-semibold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter E-mail"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-500 py-2 text-white hover:bg-indigo-600"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">Or</p>
            <button
              onClick={handleGoogleSignIn}
              className="mt-2 flex w-full items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <GoogleIcon className="mr-2 size-6" />
              Sign in with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">
              If you don’t have an account,{' '}
              <a href="/register" className="text-indigo-500 hover:underline">
                Sign up here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
