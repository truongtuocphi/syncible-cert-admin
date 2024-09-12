'use client';

import { useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

import { GoogleIcon } from '@/assets/icons';
import { auth, db, set, ref } from '@/lib/firebase';
import { signInWithPopup, provider } from '@/lib/firebase';

interface FormData {
  firstName: string;
  lastName: string;
  institution: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  institution?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    institution: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [showContinueSignUp, setShowContinueSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }
    if (!formData.institution) {
      errors.institution = 'Institution name is required.';
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (!validatePassword(formData.password)) {
      errors.password =
        'Password must be at least 8 characters long, with one uppercase letter, one number, and one special character.';
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { firstName, lastName, institution, email, password } = formData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        await set(userRef, {
          uid: user.uid,
          firstName,
          lastName,
          institution,
          email,
          createdAt: new Date().toISOString(),
        });
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setFormErrors({
        email:
          firebaseError.code === 'auth/email-already-in-use'
            ? 'Email is already in use.'
            : 'Registration failed.',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setLoading(false);
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
        className={`z-10 ${!showContinueSignUp && 'h-screen lg:p-10'} w-full p-5 text-black backdrop-blur-sm md:w-[500px] xl:max-h-[850px]`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '56px 8px 56px 8px' }}
      >
        <div className="p-3">
          <Image src="/SyncibleAdmin.png" alt="logo" width={110} height={30} />
        </div>
        {!showContinueSignUp ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-full max-w-md overflow-y-auto">
              <h1 className="text-center text-2xl font-bold">Sign up to Syncible!</h1>
              <button
                onClick={() => setShowContinueSignUp(true)}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-white"
              >
                Continue with email
              </button>
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-[20px] border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                <GoogleIcon className="mr-2 size-6" />
                Sign in with Google
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?{' '}
                  <a href="/login" className="font-bold text-primary hover:underline">
                    Sign in today!
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-lg p-6">
            <div className="mb-6 flex items-center justify-start gap-4">
              <Link href={'/login'}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-gray-300 bg-white text-center">
                  <IoIosArrowBack className="text-xl" />
                </div>
              </Link>
              <h1 className="text-center text-2xl font-bold">Sign up to Syncible!</h1>
            </div>
            {success && <p className="text-green-500">{success}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex items-start gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-left font-semibold">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-left font-semibold">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="institution" className="block text-left font-semibold">
                  Educational institution name
                </label>
                <input
                  id="institution"
                  type="text"
                  placeholder="Enter your educational institution name"
                  className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.institution ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.institution}
                  onChange={handleChange}
                />
                {formErrors.institution && (
                  <p className="text-sm text-red-500">{formErrors.institution}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-left font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-left font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-4 top-12 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-left font-semibold">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your Password"
                  className={`mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-4 top-12 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>
                )}
              </div>
              <button type="submit" className="w-full rounded-xl bg-primary py-3 text-white">
                Create account
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?{' '}
                  <a href="/login" className="font-bold text-primary hover:underline">
                    Sign in today!
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
