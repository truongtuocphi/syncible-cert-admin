'use client';

import { useState } from 'react';

import { ref, set } from 'firebase/database';
import Image from 'next/image';

import { db } from '@/lib/firebase';

const CreateCollection: React.FC = () => {
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [contractName, setContractName] = useState<string>('');
  const [contractSymbol, setContractSymbol] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleImageChange = (
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

  const handleSubmit = () => {
    const collectionRef = ref(db, 'collections/');
    set(collectionRef, {
      displayName,
      contractName,
      contractSymbol,
      description,
      logoImage,
      bannerImage,
    });
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Create ERC-721 Collection</h1>
      <div className="flex space-x-6">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-3/5 space-y-4 rounded-lg bg-white p-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Logo Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setLogoImage)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setBannerImage)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contract Name</label>
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contract Symbol</label>
            <input
              type="text"
              value={contractSymbol}
              onChange={(e) => setContractSymbol(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
              rows={4}
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-blue-500 py-2 text-white">
            Create Collection
          </button>
        </form>

        {/* Preview Section */}
        <div className="h-fit w-full rounded-lg bg-white p-4 shadow-md sm:w-2/5">
          <h2 className="mb-1 text-lg font-bold text-gray-500">Preview</h2>
          <div className="h-fit w-full rounded-lg border-[0.5px] border-dotted border-gray-500 p-3">
            <div className="relative h-56">
              {bannerImage && (
                <Image
                  src={bannerImage}
                  alt="Banner Preview"
                  width={600}
                  height={200}
                  className="h-1/2 rounded object-cover"
                />
              )}
              {logoImage && (
                <div className="absolute left-1/2 top-1/4 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full">
                  <Image
                    src={logoImage}
                    alt="Logo Preview"
                    width={96}
                    height={96}
                    className="h-full w-full"
                  />
                </div>
              )}
              {displayName && (
                <div className="mt-10 text-center">
                  <p className="mt-4 text-lg font-semibold">{displayName}</p>
                  <p className="text-gray-500">ERC-721</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
