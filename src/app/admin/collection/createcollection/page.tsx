'use client';

import { useState } from 'react';

import { ref, set } from 'firebase/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaImage, FaTimes } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import deployContract from '@/contract/deployContract';
import { db } from '@/lib/firebase';

const CreateCollection: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [contractName, setContractName] = useState<string>('');
  const [contractSymbol, setContractSymbol] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName || !contractName || !contractSymbol || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);

      // Deploy the contract
      const contractAddress = await deployContract();

      // Save data to Firebase
      const collectionRef = ref(db, `collections/${contractAddress}`);
      await set(collectionRef, {
        displayName,
        contractName,
        contractSymbol,
        description,
        logoImage,
        bannerImage,
        contractAddress,
        address,
      });

      alert('Collection created and contract deployed successfully!');
      router.push('/admin/collection');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating collection or deploying contract:', error);
      alert('Failed to create collection or deploy contract. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-600">Create ERC-721 Collection</h1>
      <div className="flex space-x-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-lg bg-white p-4 sm:w-3/5">
          <div className="flex items-center gap-4">
            {previewImage ? (
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-gray-300">
                <Image
                  src={previewImage}
                  alt="Selected Media"
                  className="h-full w-full object-cover"
                  width={160}
                  height={160}
                />
              </div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[0.5px] border-dashed border-gray-300 bg-gray-50">
                <FaImage className="text-3xl text-gray-500" />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Logo Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setLogoImage)}
                required
                className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-500 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Banner Image</label>
            <p className="text-xs text-gray-400">
              This image will appear at the top of your collection page. Avoid including too much
              text in this banner image, as the dimension changes on different devices. Recommended
              size: 1400 x 400 px. Supported formats: JPG, PNG, SVG. Maximum size: 3 MB.
            </p>
            <div
              className="relative flex h-56 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400"
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
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <p className="text-xs text-gray-400">
              This is display name for collection on your store.
            </p>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contract Name</label>
            <p className="text-xs text-gray-400">
              This contract name can&apos;t be changed in the future.
            </p>
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contract Symbol</label>
            <p className="text-xs text-gray-400">
              This contract symbol can&apos;t be changed in the future.
            </p>
            <input
              type="text"
              value={contractSymbol}
              onChange={(e) => setContractSymbol(e.target.value)}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="text-xs text-gray-400">A detailed description of your collection.</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          {/* Submit Button */}
          <ButtonPrimary type="submit" className="w-full py-3 text-lg font-semibold">
            {isLoading ? 'Creating...' : 'Create Collection'}
          </ButtonPrimary>
        </form>

        {/* Preview Section */}
        <div className="h-fit w-full rounded-lg bg-white p-4 shadow-md sm:w-2/5">
          <h2 className="mb-1 text-lg font-bold text-gray-600">Preview</h2>
          <div className="h-fit w-full rounded-lg border-[0.5px] border-dashed border-gray-400 p-3">
            <div className="relative h-56">
              {bannerImage ? (
                <Image
                  src={bannerImage}
                  alt="Banner Preview"
                  width={600}
                  height={200}
                  className="h-1/2 rounded-lg object-cover"
                />
              ) : (
                <div className="h-1/2 w-full rounded-lg border-[0.5px] border-gray-100 bg-gray-50"></div>
              )}
              {logoImage ? (
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-gray-400 bg-white">
                  <Image
                    src={logoImage}
                    alt="Logo Preview"
                    width={112}
                    height={112}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-gray-200 bg-gray-100">
                  <FaImage className="absolute left-1/2 top-[40%] -translate-x-1/2 text-3xl text-gray-500" />
                </div>
              )}
              {displayName ? (
                <div className="mt-16 text-center">
                  <h3 className="mt-2 text-lg font-bold text-gray-800">{displayName}</h3>
                  <p className="mt-1 text-sm font-semibold text-gray-600">ERC 721</p>
                </div>
              ) : (
                <div className="mt-16 text-center">
                  <p className="text-sm font-semibold text-gray-600">Preview of your collection</p>
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
