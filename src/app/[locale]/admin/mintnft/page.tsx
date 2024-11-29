'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { MintBulk } from '@/components/pages/admin/mint/MintBulk';
import { MintSingleForm } from '@/components/pages/admin/mint/Mintsingle';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Loading from '@/components/common/loading/Loading';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import Modal from '@/components/pages/admin/Modal';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { db, ref, get } from '@/lib/firebase';
import { saveMintData } from '@/utils/saveMintData';
import { uploadImageToPinata } from '@/utils/uploadImageToPinataContract';
import { Collection } from '@/types/function';
import { BiImageAdd } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';
import { FaArrowLeft, FaImage, FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import ABI from '@/contract/ABI.json';
import pLimit from 'p-limit';
import uploadMetadataWithRetry from '@/utils/uploadMetadataWithRetry';

const fontOptions: string[] = [
  'MonteCarlo',
  'Noto Serif',
  'Crimson Text',
  'Great Vibes',
  'Dancing Script',
  'EB Garamond',
  'Montserrat',
  'Open Sans',
  'Playfair Display',
  'Roboto',
  'Noto Serif Display',
  'Old Standard TT',
  'Playball',
  'Prata',
  'Updock',
];

const Experience = () => {
  const pathname = useSearchParams();
  const router = useRouter();
  const { address } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [fileBannerImage, setFileBannerImage] = useState<string>('');
  const [role, setRole] = useState<'Teacher' | 'Student'>('Student');
  const [issuedDate, setIssuedDate] = useState<string>('');
  const [selectedContract, setSelectedContract] = useState<Collection[]>([]);
  const [collectionContractAddress, setcollectionContractAddress] = useState<string>('');
  const [csvDataFromChild, setCsvDataFromChild] = useState<any[]>([]);
  const [dataFromMintSingle, setDataFromMintSingle] = useState<any[]>([]);
  const [coppyCsvDataFromChild, setCoppyCsvDataFromChild] = useState<any[]>([]);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingBanner, setLoadingBanner] = useState<boolean>(false);
  const [tokenLink, setTokenLink] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('Dancing Script');

  const fontSize = 40;
  const typePage = pathname.get('type');
  const t = useTranslations('Dapp.mintNFT');
  const limit = pLimit(5);

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

  const handleImageBannerChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const file = e.target?.files?.[0];

    if (file) {
      setLoading(true);
      setFileBannerImage(file.name);
      try {
        const imageUrl = await uploadImageToPinata(file);
        setImage(imageUrl);
      } catch (error) {
        console.error('Failed to upload image', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCsvRead = (data: any[]) => {
    setCsvDataFromChild(data);
  };

  const handleGetDataMintSingle = (data: any[]) => {
    setDataFromMintSingle(data);
    setCoppyCsvDataFromChild([]);
  };

  const calculateGasLimit = (mintCount: any, baseGasPerMint = 300000) => {
    // Gas cơ bản cho mỗi lần mint
    const baseGas = baseGasPerMint * mintCount;

    // Thêm 20% buffer để đảm bảo giao dịch không bị fail
    const gasWithBuffer = Math.ceil(baseGas * 1.2);

    // Giới hạn gas tối thiểu và tối đa
    const minGas = 100000;
    const maxGas = 15000000;

    // Đảm bảo gas nằm trong khoảng hợp lý
    return Math.min(Math.max(gasWithBuffer, minGas), maxGas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert('Please connect your wallet.');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      alert('Please install a wallet like MetaMask.');
      return;
    }

    setLoadingButton(true);

    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(collectionContractAddress, ABI, signer);

        const mintDataArray = await Promise.all(
          (coppyCsvDataFromChild.length > 0 ? coppyCsvDataFromChild : dataFromMintSingle).map(
            async (data) => {
              return limit(async () => {
                const metadata = {
                  fullname: `Certificate for ${data.fullname}` || 'Default Name',
                  tokenURI: tokenLink || 'Default tokenLink',
                  attributes: [
                    { trait_type: 'Certificate ID', value: data.certificateNumber || 'NaN' },
                    { trait_type: 'Role', value: role || 'NaN' },
                    { trait_type: 'Date', value: issuedDate || 'NaN' },
                    { trait_type: 'Template URL', value: bannerImage || 'NaN' },
                    { trait_type: 'Font', value: fontFamily || 'NaN' },
                    { trait_type: 'Font Size', value: fontSize || 'NaN' },
                  ],
                };

                const tokenURI = await uploadMetadataWithRetry(metadata, 3);
                if (tokenURI) {
                  setTokenLink(tokenURI);
                }

                return [
                  address,
                  data.fullname,
                  data.certificateNumber,
                  tokenURI,
                  [issuedDate, bannerImage],
                ];
              });
            }
          )
        );

        if (mintDataArray.length > 0) {
          const gasLimit = calculateGasLimit(mintDataArray.length);
          // const finalGas = 10000000 * mintDataArray.length;
          const tx = await contract.mintBulk(mintDataArray, {
            // gasLimit: finalGas,
            gasLimit: gasLimit,
          });

          await tx.wait();
          alert('Chứng chỉ được tạo thành công!');
          setLoading(true);
          await saveMintData(mintDataArray, collectionContractAddress, fontSize, fontFamily);
        }
      }
    } catch (error) {
      console.error('Error minting NFTs:', error);
      alert('lỗi tạo chứng chỉ.');
      setLoadingButton(false);
    } finally {
      setLoading(false);
    }
  };

  // const calculateGasLimit = (
  //   mintCount: number,
  //   estimateGasPerMint: number,
  //   bufferMultiplier: number
  // ) => {
  //   const baseGas = estimateGasPerMint * mintCount;

  //   const gasWithBuffer = Math.ceil(baseGas * bufferMultiplier);

  //   const minGas = 100000;
  //   const maxGas = 15000000;

  //   return Math.min(Math.max(gasWithBuffer, minGas), maxGas);
  // };

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'collections');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const collections: Collection[] = [];
          snapshot.forEach((childSnapshot) => {
            const collection = childSnapshot.val();
            if (collection?.address === address) {
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

  useEffect(() => {
    if (selectedContract.length > 0) {
      setcollectionContractAddress(selectedContract[0].contractAddress);
    }
  }, [selectedContract]);

  useEffect(() => {
    if (csvDataFromChild.length > 0) {
      const validData = csvDataFromChild.filter(
        (data) => data.fullname && data.fullname.trim() !== ''
      );
      setCoppyCsvDataFromChild(validData);
      setDataFromMintSingle([]);
    } else {
      setCoppyCsvDataFromChild([]);
    }
  }, [csvDataFromChild]);

  useEffect(() => {
    const handleBeforeUnload = (event: { returnValue: string }) => {
      const message =
        'Are you sure you want to leave this page? Exiting now may cause errors, and you will need to return to the home page and start over.';
      event.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (loading) router.push(`/admin/collection/collectiondetail`);

  return (
    <>
      <div className="mb-4">
        <Breadcrumb />
      </div>
      {typePage == null ? (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      ) : (
        <div className="h-full space-y-6">
          <div className="flex items-center gap-2">
            <Link href={'/admin'}>
              <ButtonPrimary className="size-10 rounded-lg p-2 text-white">
                <FaArrowLeft />
              </ButtonPrimary>
            </Link>
            <h1 className="text-2xl font-semibold">{t('titleback')}</h1>
          </div>
          <div className="rounded-3xl bg-white p-6">
            <h1 className="mb-4 text-xl font-bold">{t('title')}</h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full space-y-4 rounded-lg bg-white">
                <div className="flex items-center justify-start gap-4">
                  <div className="h-1/2 w-1/2 space-y-2 ">
                    <label className="block text-base font-bold text-gray-700">
                      {t('titleImage')}
                    </label>
                    <p className="text-xs text-gray-400">{t('subTitleImage')}</p>
                    <div
                      className="relative flex w-full items-center justify-start rounded-lg py-5 text-gray-600 hover:border-gray-400 2xl:h-72"
                      onDrop={(e) => handleDrop(e, setBannerImage)}
                      onDragOver={handleDragOver}
                    >
                      {loadingBanner ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <Loading />
                        </div>
                      ) : bannerImage ? (
                        <div className="flex h-full w-full items-center justify-start gap-3">
                          {`${fileBannerImage?.slice(0, 7)}...${fileBannerImage?.slice(-6)}`}
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="rounded-full bg-gray-700 p-1 text-white"
                          >
                            <FaTimes className="text-base" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="space-y-2">
                            <input
                              type="file"
                              onChange={(e) =>
                                handleImageBannerChange(e, setBannerImage, setLoadingBanner)
                              }
                              accept=".jpg, .png"
                              required
                              className="absolute bottom-4 opacity-0"
                              id="file-upload"
                            />
                            <div className="flex items-center gap-4">
                              <label
                                htmlFor="file-upload"
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
                              >
                                <BiImageAdd className="text-2xl text-gray-800" />
                                {t('buttonFile')}
                              </label>
                              {fileBannerImage.length > 17
                                ? `${fileBannerImage?.slice(0, 7)}...${fileBannerImage?.slice(-6)}`
                                : fileBannerImage}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sticky h-fit w-1/2">
                    <div className="mt-2 h-fit w-full overflow-hidden rounded-lg border-[0.5px] border-dashed border-gray-400">
                      {bannerImage ? (
                        <CertificatePreview
                          previewImage={bannerImage}
                          name={
                            typePage === 'mintbulk'
                              ? coppyCsvDataFromChild[0]?.fullname
                              : dataFromMintSingle[0]?.fullname
                          }
                          fontFamily={fontFamily}
                          fontSizeMint={fontSize}
                        />
                      ) : (
                        <div className="relative h-96 bg-gray-50 2xl:h-[430px]">
                          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-gray-200 bg-gray-100">
                            <FaImage className="absolute left-1/2 top-[40%] -translate-x-1/2 text-3xl text-gray-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">
                    {t('titleRole')}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'Teacher' | 'Student')}
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">
                    {t('titleDate')}
                  </label>
                  <input
                    type="date"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  />
                </div>
                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">
                    {t('titleCertificateto')}
                  </label>
                  <select
                    onChange={(e) => setcollectionContractAddress(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  >
                    {selectedContract.length === 0 ? (
                      <option value="">
                        {!address ? t('notiCertificate_1') : t('notiCertificate_2')}
                      </option>
                    ) : (
                      selectedContract.map((collection) => (
                        <option key={collection.id} value={collection.contractAddress}>
                          {collection.displayName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className="mt-4 w-full">
                {typePage === 'mintsingle' ? (
                  <MintSingleForm
                    DataIssuedDate={issuedDate}
                    DataRole={role}
                    onGetData={handleGetDataMintSingle}
                  />
                ) : (
                  <MintBulk DataIssuedDate={issuedDate} DataRole={role} onCsvRead={handleCsvRead} />
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">
                    {t('titleFont')}
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-4">
                <Link href={'/admin'}>
                  <ButtonPrimary
                    className="w-40 border-2 border-primary-50 bg-white text-primary-50"
                    disabled={loadingButton}
                  >
                    {t('ButtonCancel')}
                  </ButtonPrimary>
                </Link>
                <ButtonPrimary
                  type="submit"
                  className="flex items-center gap-2 text-white"
                  disabled={loadingButton}
                >
                  <GrCertificate className="text-lg text-white" />
                  {loadingButton
                    ? `${t('ButtonSubmitLoading')}`
                    : `${t('ButtonCreateCertificate')}`}
                </ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
