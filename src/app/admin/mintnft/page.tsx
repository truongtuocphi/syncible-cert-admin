'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { db, ref, get, onAuthStateChanged, auth } from '@/lib/firebase';

import { FaImage, FaTimes } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import CreateNFT from '@/components/pages/experience/CreateNFT';

interface Collection {
  id: string;
  displayName: string;
  contractAddress: string;
}

const Experience = () => {
  const pathname = useSearchParams();
  const { address } = useAccount();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [role, setRole] = useState<'Teacher' | 'Student'>('Student');
  const [selectedContract, setSelectedContract] = useState<Collection[]>([]);
  const [collectionContractAddress, setcollectionContractAddress] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [top, setTop] = useState(20);

  const typePage = pathname.get('type');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'collections');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const collections: Collection[] = [];
          snapshot.forEach((childSnapshot) => {
            const collection = childSnapshot.val();
            // Kiểm tra nếu địa chỉ ví của người dùng khớp với địa chỉ trong dữ liệu Firebase
            if (collection.address === address) {
              collections.push({
                id: childSnapshot.key || '',
                displayName: collection.displayName,
                contractAddress: collection.contractAddress,
              });
            }
          });
          setSelectedContract(collections);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [address]);

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
  };

  const handleImageBannerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setTop(100);
      } else {
        setTop(20);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup khi component bị unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-600">Quay lại</h1>
      <div className="flex space-x-6">
        <form className="w-full space-y-4 rounded-lg bg-white p-4 sm:w-3/5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Hình chứng chỉ</label>
            <p className="text-xs text-gray-400">Tải mẫu chứng chỉ mà bạn đã tùy chỉnh lên đây</p>
            <div
              className="relative flex h-56 w-full items-center justify-center rounded-lg border-[1px] border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400"
              onDrop={(e) => handleDrop(e, setBannerImage)}
              onDragOver={handleDragOver}
            >
              {bannerImage ? (
                <div className="relative h-full w-full">
                  <Image
                    src={bannerImage}
                    alt="Banner Image"
                    fill
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-2 top-2 rounded-full bg-gray-700 p-1 text-white"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaImage className="text-3xl text-gray-500" />
                  <p className="mt-2 text-sm text-gray-500">Drag & drop or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => handleImageBannerChange(e, setBannerImage)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Chức vụ</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'Teacher' | 'Student')}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ngày phát hành chứng chỉ
            </label>
            <input
              type="date"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700"> Lưu chứng chỉ số vào</label>
            <select
              onChange={(e) => setcollectionContractAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {selectedContract.length === 0 ? (
                <option value="">No contracts available</option>
              ) : (
                selectedContract.map((collection) => (
                  <option key={collection.id} value={collection.contractAddress}>
                    {collection.displayName}
                  </option>
                ))
              )}
            </select>
          </div>
        </form>

        {/* preview */}
        <div
          className="sticky h-fit w-full rounded-lg bg-white p-4 shadow-md sm:w-2/5"
          style={{ top: `${top}px` }}
        >
          asdg
        </div>
      </div>
    </div>
  );
};

export default Experience;
