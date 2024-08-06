import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);

  if (!session || !session.user) {
    return null;
  }

  const toggleLogout = () => setShowLogout(!showLogout);

  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex cursor-pointer items-center" onClick={toggleLogout}>
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="h-16 w-16 rounded-full"
          />
        )}
        <div className="ml-4">
          <h2 className="text-xl font-bold text-black">{session.user.name}</h2>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>
      {showLogout && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
          <button
            onClick={() => signOut()}
            className="block w-full rounded-b-lg px-4 py-2 text-left text-red-500 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
