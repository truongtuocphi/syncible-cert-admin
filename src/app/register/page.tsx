'use client';

import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth, db, set, ref } from '@/lib/firebase';
import Banner_login from '../../../public/banner_login.png';

interface FormData {
  firstName: string;
  lastName: string;
  institution: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, institution, email, password, confirmPassword } = formData;

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

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

      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('The email address is already in use.');
      } else {
        setError('Failed to register user.');
      }
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
          <h1 className="mb-6 text-center text-2xl font-bold">Sign up to Syncible!</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-left font-semibold">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-left font-semibold">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="institution" className="block text-left font-semibold">
                Educational institution name
              </label>
              <input
                id="institution"
                type="text"
                placeholder="Enter your educational institution name"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.institution}
                onChange={handleChange}
              />
            </div>
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-left font-semibold">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter Password"
                required
                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-500 py-2 text-white hover:bg-indigo-600"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              If you already have an account,{' '}
              <a href="/login" className="text-indigo-500 hover:underline">
                Sign in today!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
