// pages/admin/index.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import UserInfo from '@/components/pages/admin/UserInfo';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Bạn cần đăng nhập để truy cập trang này.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-center border-b py-4">
          <h1 className="text-2xl font-bold text-gray-800">Syncible</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a href="/admin/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                My Collection
              </a>
            </li>
            <li>
              <a href="/experience" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                NFT Diploma
              </a>
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
            {session && session.user ? (
              <div className="flex items-center space-x-2">
                <UserInfo />
              </div>
            ) : (
              <a href="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </a>
            )}
          </div>
        </div>

        {/* Page content */}
        <div className="rounded-lg bg-white p-6 text-black shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
          {/* Add your page content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
