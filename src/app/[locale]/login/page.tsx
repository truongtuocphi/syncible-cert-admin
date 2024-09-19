<<<<<<< HEAD:src/app/login/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { setPersistence } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { GoogleIcon } from '@/assets/icons';
import Loading from '@/components/common/loading/Loading';
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  provider,
  browserSessionPersistence,
} from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    setError('');
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      setError('Invalid credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      setLoading(false);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-start overflow-hidden px-8 py-5">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        src="/video/Cubes_Diagonal_3840x2160.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div
        className="z-10 w-full p-2 text-black backdrop-blur-sm md:w-[470px] lg:p-10 2xl:h-[850px]"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '56px 8px 56px 8px' }}
      >
        <div className="p-3">
          <Image src="/SyncibleAdmin.png" alt="logo" width={110} height={30} />
        </div>
        <div className="mx-auto mt-16 w-full max-w-lg p-3">
          <h1 className="mb-6 text-center text-2xl font-bold">Sign in to Syncible!</h1>
          {loading && <Loading />}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter E-mail"
                required
                className={`mt-2 w-full rounded-xl border ${error ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left font-semibold">
                <div className="flex items-center justify-between">
                  <div>Password</div>
                  <div className="font-normal text-primary-50">Forgot password?</div>
                </div>
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  required
                  className={`mt-2 w-full rounded-xl border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } bg-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute inset-y-0 right-4 top-2 flex cursor-pointer items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>

            {/* {error && <p className="mt-2 text-center text-red-500">{error}</p>} */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[20px] bg-primary-50 py-3 text-white hover:bg-primary-50 disabled:opacity-50"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-[20px] border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <GoogleIcon className="mr-2 size-6" />
              Sign in with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don&rsquo;t have an account?{' '}
              <a href="/register" className="font-bold text-primary-50 hover:underline">
                Sign up here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { GoogleIcon } from '@/assets/icons';
import Loading from '@/components/common/loading/Loading';
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  provider,
  browserSessionPersistence,
} from '@/lib/firebase';
import { setPersistence } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    setError('');
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      setError('Invalid credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      setLoading(false);
      setError('Failed to sign in with Google.');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-start overflow-hidden px-8 py-5">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        src="/video/Cubes_Diagonal_3840x2160.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div
        className="z-10 w-full p-2 text-black backdrop-blur-sm md:w-[470px] lg:p-10 2xl:h-[850px]"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '56px 8px 56px 8px' }}
      >
        <div className="p-3">
          <Image src="/SyncibleAdmin.png" alt="logo" width={110} height={30} />
        </div>
        <div className="mx-auto mt-16 w-full max-w-lg p-3">
          <h1 className="mb-6 text-center text-2xl font-bold">Sign in to Syncible!</h1>
          {loading && <Loading />}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter E-mail"
                required
                className={`mt-2 w-full rounded-xl border ${error ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left font-semibold">
                <div className="flex items-center justify-between">
                  <div>Password</div>
                  <div className="font-normal text-primary-50">Forgot password?</div>
                </div>
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  required
                  className={`mt-2 w-full rounded-xl border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } bg-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute inset-y-0 right-4 top-2 flex cursor-pointer items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>

            {/* {error && <p className="mt-2 text-center text-red-500">{error}</p>} */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[20px] bg-primary-50 py-3 text-white hover:bg-primary-50 disabled:opacity-50"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-[20px] border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <GoogleIcon className="mr-2 size-6" />
              Sign in with Google
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don&rsquo;t have an account?{' '}
              <a href="/register" className="font-bold text-primary-50 hover:underline">
                Sign up here!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 8715b16 (big update, adding localization, switch between english and vietnamese, bugs: top nav links smooth scroll in mobile screen didn't trigger smooth scroll from gsap, may fix later):src/app/[locale]/login/page.tsx
