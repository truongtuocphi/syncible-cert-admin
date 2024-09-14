'use client';

import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaImage, FaTimes } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { MintBulk } from '@/components/pages/admin/mint/MintBulk';
import { MintSingleForm } from '@/components/pages/admin/mint/Mintsingle';
import Modal from '@/components/pages/admin/Modal';
import ABI from '@/contract/ABI.json';
import { db, ref, get } from '@/lib/firebase';
import { uploadMetadata } from '@/lib/pinata';
import { Collection } from '@/types/function';
import { saveMintData } from '@/utils/saveMintData';

const Experience = () => {
  const pathname = useSearchParams();
  const router = useRouter();
  const { address } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [role, setRole] = useState<'Teacher' | 'Student'>('Student');
  const [issuedDate, setIssuedDate] = useState('');
  const [selectedContract, setSelectedContract] = useState<Collection[]>([]);
  const [collectionContractAddress, setcollectionContractAddress] = useState('');
  const [csvDataFromChild, setCsvDataFromChild] = useState<any[]>([]);
  const [dataFromMintSingle, setDataFromMintSingle] = useState<any[]>([]);
  const [coppyCsvDataFromChild, setCoppyCsvDataFromChild] = useState<any[]>([]);
  const [top, setTop] = useState(20);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenLink, setTokenLink] = useState('');
  const [fullName, setFullName] = useState('');

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
          // eslint-disable-next-line no-console
          console.log('No data available');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [address]);

  useEffect(() => {
    if (selectedContract.length > 0) {
      // Lấy địa chỉ hợp đồng đầu tiên trong selectedContract
      setcollectionContractAddress(selectedContract[0].contractAddress);
    }
  }, [selectedContract]);

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

  const handleCsvRead = (data: any[]) => {
    setCsvDataFromChild(data);
  };

  const handleGetDataMintSingle = (data: any[]) => {
    setDataFromMintSingle(data);
    setCoppyCsvDataFromChild([]);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (address) {
      setLoadingButton(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(collectionContractAddress, ABI, signer);

        const mintDataArray: any = [];

        if (coppyCsvDataFromChild.length > 0) {
          coppyCsvDataFromChild.map(async (data) => {
            const metadata = {
              fullname: `Certificate for ${data.fullname}` || 'Default Name',
              tokenURI: tokenLink || 'Default tokenLink',
              attributes: [
                { trait_type: 'Certificate ID', value: data.certificateNumber || 'NaN' },
                { trait_type: 'Role', value: role || 'NaN' },
                { trait_type: 'Date', value: issuedDate || 'NaN' },
                {
                  trait_type: 'Template URL',
                  value: bannerImage || 'NaN',
                },
              ],
            };

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            mintDataArray.push({
              owner: address,
              fullname: `${data.fullname}` || 'Default Name',
              certificateId: data.certificateNumber || 'NaN',
              tokenURI: tokenURI || 'Default tokenLink',
              certData: {
                role: role || 'NaN',
                date: issuedDate || 'NaN',
                templateURL: bannerImage || 'NaN',
              },
            });
          });
        } else {
          dataFromMintSingle.map(async (data) => {
            const metadata = {
              fullname: `Certificate for ${data.fullname}` || 'Default Name',
              tokenURI: tokenLink || 'Default tokenLink',
              attributes: [
                { trait_type: 'Certificate ID', value: data.certificateNumber || '' },
                { trait_type: 'Role', value: role || '' },
                { trait_type: 'Date', value: issuedDate || '' },
                {
                  trait_type: 'Template URL',
                  value: bannerImage || '',
                },
              ],
            };

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            mintDataArray.push({
              owner: address,
              fullname: `${data.fullname}` || 'Default Name',
              certificateId: data.certificateNumber || 'NaN',
              tokenURI: tokenURI || 'Default tokenLink',
              certData: {
                role: role || 'NaN',
                date: issuedDate || 'NaN',
                templateURL: bannerImage || 'NaN',
              },
            });
          });
        }

        const tx = await contract.mintBulk(mintDataArray, {
          gasLimit: 10000000,
        });

        await tx.wait();
        alert('NFTs minted successfully!');
        setLoading(true);

        await saveMintData(mintDataArray, collectionContractAddress);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error minting NFTs:', error);
        alert('Failed to mint NFTs.');
        setLoadingButton(false);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please connect your wallet.');
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) router.push(`/admin/collection/collectiondetail`);

  return (
    <>
      {typePage == null ? (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Link href={'/admin'}>
              <ButtonPrimary className="size-10 rounded-lg p-2 text-white">
                <FaArrowLeft />
              </ButtonPrimary>
            </Link>
            <h1 className="text-2xl font-semibold">Quay lại</h1>
          </div>
          <div className="flex space-x-6">
            <form onSubmit={handleSubmit} className="w-full sm:w-1/2">
              <div className="w-full space-y-4 rounded-lg bg-white p-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Hình chứng chỉ</label>
                  <p className="text-xs text-gray-400">
                    Tải mẫu chứng chỉ mà bạn đã tùy chỉnh lên đây
                  </p>
                  <div
                    className="relative flex h-80 w-full items-center justify-center rounded-lg border-[1px] border-dashed border-gray-300 bg-gray-50 text-gray-600 hover:border-gray-400"
                    onDrop={(e) => handleDrop(e, setBannerImage)}
                    onDragOver={handleDragOver}
                  >
                    {bannerImage ? (
                      <div className="relative h-full w-full">
                        <Image src={bannerImage} alt="Banner Image" fill className="rounded-md " />
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
                        <p className="mt-2 text-sm text-gray-500">
                          Kéo & thả hoặc click để tải lên
                        </p>
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
                  <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'Teacher' | 'Student')}
                    required
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
                  <label className="block text-sm font-medium text-gray-700">
                    Lưu chứng chỉ số vào
                  </label>
                  <select
                    onChange={(e) => setcollectionContractAddress(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {selectedContract.length === 0 ? (
                      <option value="">Vui lòng kết nối ví để hiện thị dữ liệu</option>
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

              <div className="mt-4 w-full space-y-3 rounded-lg bg-white p-4">
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

              <div className="mt-4 flex items-center justify-end gap-4">
                <Link href={'/admin'}>
                  <ButtonPrimary
                    className="w-40 border-2 border-primary-50 bg-white text-primary-50"
                    disabled={loadingButton}
                  >
                    Hủy
                  </ButtonPrimary>
                </Link>
                <ButtonPrimary type="submit" className="w-40 text-white" disabled={loadingButton}>
                  {loadingButton ? 'Đang xử lý...' : 'Tạo chứng chỉ'}
                </ButtonPrimary>
              </div>
            </form>

            {/* preview */}
            <div
              className="sticky h-fit w-full rounded-lg bg-white p-4 shadow-md sm:w-1/2"
              style={{ top: `${top}px` }}
            >
              <h2 className="text-lg font-bold text-gray-600">Xem trước</h2>
              <div className="mt-2 h-fit w-full overflow-hidden rounded-lg border-[0.5px] border-dashed border-gray-400">
                {bannerImage ? (
                  <CertificatePreview
                    previewImage={bannerImage}
                    name={
                      typePage === 'mintbulk'
                        ? coppyCsvDataFromChild[0]?.fullname
                        : dataFromMintSingle[0]?.fullname
                    }
                  />
                ) : (
                  <div className="relative h-96 bg-gray-50">
                    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-gray-200 bg-gray-100">
                      <FaImage className="absolute left-1/2 top-[40%] -translate-x-1/2 text-3xl text-gray-500" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
