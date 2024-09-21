'use client';

import { useState } from 'react';

import { ref, set } from 'firebase/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiCollection, BiImageAdd } from 'react-icons/bi';
import { FaImage, FaTimes } from 'react-icons/fa';
import { LuEye } from 'react-icons/lu';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import deployContract from '@/contract/deployContract';
import { db } from '@/lib/firebase';
import CopyAddressButton from '@/components/pages/admin/CopyAddressButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AiOutlinePicture } from 'react-icons/ai';

const CreateCollection: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [fileLogoImage, setfileLogoImage] = useState<string | null>('');
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
      setfileLogoImage(file.name);
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

      const contractAddress = await deployContract(displayName, address);

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
    <div className="space-y-6 rounded-lg bg-white p-6">
      <h1 className="text-2xl font-semibold text-gray-600">Create ERC-721 Collection</h1>
      <div className="flex space-x-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-900">Logo Image</label>
              <p className="text-xs text-gray-400">Update your logo collection.</p>
            </div>
            <div className="flex w-1/2 items-center gap-4">
              {previewImage ? (
                <div className="relative h-36 w-36 overflow-hidden rounded-full bg-gray-300">
                  <Image
                    src={previewImage}
                    alt="Selected Media"
                    className="h-full w-full object-cover"
                    width={144}
                    height={144}
                  />
                </div>
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[0.5px] border-dashed border-gray-300 bg-gray-50">
                  <FaImage className="text-3xl text-gray-500" />
                </div>
              )}
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setLogoImage)}
                  required
                  className="hidden"
                  id="file-upload"
                />
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-500 hover:bg-gray-100"
                  >
                    <BiImageAdd className="text-2xl text-black" />
                    Choose file
                  </label>
                  {fileLogoImage && `${fileLogoImage?.slice(0, 4)}...${fileLogoImage?.slice(-4)}`}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 space-y-2">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-900">Banner Image</label>
              <p className="text-xs text-gray-400">
                This image will appear at the top of your collection page. Avoid including too much
                text in this banner image, as the dimension changes on different devices.
                Recommended size: 1400 x 400 px. Supported formats: JPG, PNG, SVG. Maximum size: 3
                MB.
              </p>
            </div>
            <div
              className="relative flex h-56 w-1/2 items-center justify-center rounded-lg border-[1px] border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400"
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
                  <p className="mt-2 text-base text-gray-500">Drag & drop or click to upload</p>
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
          <div className="flex items-center gap-4 space-y-2">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-900">Display Name</label>
              <p className="text-xs text-gray-400">
                This is display name for collection on your store.
              </p>
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={displayName}
                placeholder="Display Name"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setContractName(e.target.value);
                }}
                className="block w-full rounded-xl border p-4 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-4 space-y-2">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-900">Contract Symbol</label>
              <p className="text-xs text-gray-400">
                This contract symbol can&apos;t be changed in the future.
              </p>
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={contractSymbol}
                placeholder="Contract Symbol"
                onChange={(e) => setContractSymbol(e.target.value)}
                className="block w-full rounded-xl border p-4 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </div>
          <div className="flex items-start gap-4 space-y-2">
            <div className="w-1/2">
              <label className="block text-base font-medium text-gray-900">Description</label>
              <p className="text-xs text-gray-400">A detailed description of your collection.</p>
            </div>
            <div className="w-1/2">
              <textarea
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            <Drawer>
              <DrawerTrigger asChild>
                <ButtonPrimary className="flex items-center gap-2 border-[0.5px] border-gray-200 bg-transparent text-gray-800 hover:bg-primary-50 hover:text-white">
                  <LuEye className="text-lg" />
                  Preview
                </ButtonPrimary>
              </DrawerTrigger>
              <DrawerContent className="mx-auto h-[80%] w-full rounded-lg">
                <div className="mx-auto h-full w-[70%] text-gray-700">
                  <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl font-bold">Preview</DrawerTitle>
                  </DrawerHeader>
                  <ScrollArea className="h-[80%] w-full rounded-md bg-gray-100 pb-4">
                    <div className="h-fit w-full rounded-lg bg-gray-100 p-5">
                      <div className="relative h-80 w-full">
                        {bannerImage ? (
                          <Image
                            src={bannerImage}
                            alt="Banner Preview"
                            fill
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-1/2 w-full rounded-lg border-[0.5px] border-gray-100 bg-gray-50"></div>
                        )}
                        {logoImage ? (
                          <div className="absolute -bottom-14 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border-[0.5px] border-gray-400 bg-white">
                            <Image
                              src={logoImage}
                              alt="Logo Preview"
                              width={112}
                              height={112}
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-gray-200 bg-gray-100">
                            <FaImage className="absolute left-1/2 top-[40%] -translate-x-1/2 text-3xl text-gray-500" />
                          </div>
                        )}
                        {displayName ? (
                          <div className="mt-14 flex flex-col justify-center gap-2 text-center">
                            <h2 className="text-2xl font-bold text-gray-700">{displayName}</h2>
                            <div>{<CopyAddressButton textToCopy={'0x000000000000000000'} />}</div>
                            <div className="flex items-center justify-center gap-5">
                              <div className="text-center">
                                <span className="text-base font-bold text-black">0</span>
                                <span className="text-base text-gray-600">Items</span>
                              </div>

                              <div className="text-center">
                                <span className="text-base font-bold text-black">1 </span>
                                <span className="text-base text-gray-600">Owner</span>
                              </div>
                            </div>
                            <p className="mt-4 text-base text-gray-600">{description}</p>

                            <div className="mt-4">
                              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-300">
                                  <AiOutlinePicture className="text-4xl text-gray-400" />
                                </div>
                                <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gray-300">
                                  <AiOutlinePicture className="text-4xl text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-24 text-center">
                            <p className="text-base font-semibold text-gray-600">
                              Preview of your collection
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <ButtonPrimary className="mt-4 text-white">Đóng</ButtonPrimary>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <ButtonPrimary
              type="submit"
              className="flex items-center gap-2 text-base text-white"
              disabled={isLoading}
            >
              <BiCollection className="text-lg" />
              {isLoading ? 'Creating...' : 'Create Collection'}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection;
