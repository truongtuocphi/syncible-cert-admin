import Link from 'next/link';

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
