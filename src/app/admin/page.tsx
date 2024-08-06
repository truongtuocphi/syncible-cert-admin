'use client';

import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '@/lib/firebase';
import UserInfo from '@/components/pages/admin/UserInfo';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Khởi tạo router để điều hướng

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
      } else {
        // Không có người dùng đăng nhập, điều hướng đến trang login
        router.push('/login');
      }
    });

    // Dọn dẹp khi component bị gỡ bỏ
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-center border-b py-4">
          <h1 className="text-2xl font-bold text-gray-800">Syncible</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                My Collection
              </Link>
            </li>
            <li>
              <Link
                href="/admin/experience"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                NFT Diploma
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative max-w-md flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4"
            />
            <FaSearch className="absolute left-3 top-2 mt-1 text-gray-500" />
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <UserInfo user={user} />
            ) : (
              <a href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </a>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="rounded-lg bg-white p-6 text-black shadow-md">
          <div>
            <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
            {/* Add your default page content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
