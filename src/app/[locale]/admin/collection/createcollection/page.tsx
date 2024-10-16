'use client';

import { useState } from 'react';

import { ref, set } from 'firebase/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiCollection, BiImageAdd } from 'react-icons/bi';
import { FaImage } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import deployContract from '@/contract/deployContract';
import { db } from '@/lib/firebase';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const CreateCollection: React.FC = () => {
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [fileLogoImage, setfileLogoImage] = useState<string | null>('');
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [contractName, setContractName] = useState<string>('');
  const [contractSymbol, setContractSymbol] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState({ logo: false, banner: false });

  const router = useRouter();
  const { address } = useAccount();

  const t = useTranslations('Dapp.createCollection');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName || !contractName || !contractSymbol) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);

      const contractAddress = await deployContract(displayName, address, contractSymbol);

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
        createdAt: new Date().toISOString(),
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
    <>
      <div className="mb-4">
        <Breadcrumb />
      </div>
      <div className="space-y-6 rounded-lg bg-white p-6">
        <h1 className="text-2xl font-semibold text-gray-600">{t('title')}</h1>
        <div className="flex space-x-6">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* img logo and banner */}
            <div className="flex items-start justify-between gap-5">
              <div className="flex w-[30%] flex-col items-start gap-6">
                <div className="flex flex-col items-start justify-between gap-4">
                  <div className="w-full">
                    <label className="mb-2 block text-base font-medium text-gray-900">
                      {t('titleImage')}
                    </label>
                    <p className="text-xs text-gray-400">{t('subtitleImage')}</p>
                  </div>
                  <div className="relative space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setLogoImage)}
                      className="absolute h-full w-full cursor-pointer opacity-0"
                      id="file-upload"
                    />
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="file-upload"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-500 hover:bg-gray-100"
                      >
                        <BiImageAdd className="text-2xl text-black" />
                        {t('Buttonfile')}
                      </label>
                      {error.logo && (
                        <p className="text-sm text-red-500">
                          Please upload a logo image file before proceeding.
                        </p>
                      )}
                      {fileLogoImage &&
                        `${fileLogoImage?.slice(0, 4)}...${fileLogoImage?.slice(-4)}`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4 space-y-2">
                  <div className="w-full">
                    <label className="mb-2 block text-base font-medium text-gray-900">
                      {t('titleBanner')}
                    </label>
                    <p className="text-xs text-gray-400">{t('subTitleBanner')}</p>
                  </div>
                  <div onDrop={(e) => handleDrop(e, setBannerImage)} onDragOver={handleDragOver}>
                    <div className="relative space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageBannerChange(e, setBannerImage)}
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        id="file-upload-banner"
                      />
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="file-upload-banner"
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-500 hover:bg-gray-100"
                        >
                          <BiImageAdd className="text-2xl text-black" />
                          {t('Buttonfile')}
                        </label>
                        {/* {fileLogoImage &&
                          `${fileLogoImage?.slice(0, 4)}...${fileLogoImage?.slice(-4)}`} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* prewview */}
              <div className="h-fit w-1/2">
                <div className="h-fit w-full">
                  <div className="relative h-80">
                    {bannerImage ? (
                      <Image
                        src={bannerImage}
                        alt="Banner Preview"
                        width={600}
                        height={200}
                        className="h-1/2 w-full rounded-3xl object-cover"
                      />
                    ) : (
                      <div className="relative h-1/2 w-full rounded-3xl border-[0.5px] border-dashed border-gray-300 bg-[#FAFAFA]">
                        <div className="absolute left-1/2 top-[30%] flex -translate-x-1/2 items-center gap-2 text-gray-300">
                          <FaImage className="text-xl text-gray-300" />
                          {t('titlePreviewBanner')}
                        </div>
                      </div>
                    )}
                    {logoImage ? (
                      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#FAFAFA]">
                        <Image
                          src={logoImage}
                          alt="Logo Preview"
                          width={128}
                          height={128}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#FAFAFA]">
                        <div className="absolute left-1/2 top-[30%] flex -translate-x-1/2 flex-col items-center gap-2 text-gray-300">
                          <FaImage className="text-2xl text-gray-500 2xl:text-3xl" />
                          <p className="text-xs 2xl:text-sm">Logo</p>
                        </div>
                      </div>
                    )}
                    {displayName ? (
                      <div className="mt-20 text-center">
                        <h3 className="mt-2 text-lg font-bold text-gray-800">{displayName}</h3>
                        <p className="mt-1 text-sm font-semibold text-gray-600">ERC 721</p>
                      </div>
                    ) : (
                      <div className="mt-20 text-center">
                        <p className="text-sm font-semibold text-gray-600">
                          {t('titlePreviewCollection')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            <div className="flex items-center gap-4 space-y-2">
              <div className="w-1/2">
                <label className="block text-base font-medium text-gray-900">
                  {t('titleDisplayName')}
                </label>
                <p className="text-xs text-gray-400">{t('subTitleDisplayName')}</p>
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  value={displayName}
                  placeholder={t('placeholderInput_1')}
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
                <label className="block text-base font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <p>{t('titleSymbol')}</p>
                    {/* <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="p-0">
                          <IoMdHelpCircleOutline className="text-xl text-gray-600" />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-base font-bold">{t('titleHoverCard')}</h1>
                          <p className="text-sm text-gray-400">{t('subTitleHoverCard')}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard> */}
                  </div>
                </label>
                <p className="text-xs text-gray-400">{t('subTitleSymbol')}</p>
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  value={contractSymbol}
                  placeholder={t('placeholderInput_2')}
                  onChange={(e) => setContractSymbol(e.target.value)}
                  className="block w-full rounded-xl border p-4 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
            </div>
            <div className="flex items-start gap-4 space-y-2">
              <div className="w-1/2">
                <label className="block text-base font-medium text-gray-900">
                  {t('titleDescription')}
                </label>
                <p className="text-xs text-gray-400">{t('subTitleDescription')}</p>
              </div>
              <div className="w-1/2">
                <textarea
                  value={description}
                  placeholder={t('placeholderInput_3')}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="block w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-6">
              <ButtonPrimary
                type="submit"
                className="flex items-center gap-2 text-base text-white"
                disabled={isLoading}
              >
                <BiCollection className="text-lg" />
                {isLoading ? `${t('buttonCreate')}` : `${t('ButtonCreateCollection')}`}
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;
