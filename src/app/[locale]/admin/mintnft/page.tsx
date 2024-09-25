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
import Loading from '@/components/common/loading/Loading';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { MintBulk } from '@/components/pages/admin/mint/MintBulk';
import { MintSingleForm } from '@/components/pages/admin/mint/Mintsingle';
import Modal from '@/components/pages/admin/Modal';
import ABI from '@/contract/ABI.json';
import { db, ref, get } from '@/lib/firebase';
import { uploadMetadata } from '@/lib/pinata';
import { Collection } from '@/types/function';
import { saveMintData } from '@/utils/saveMintData';
import { uploadImageToPinata } from '@/utils/uploadImageToPinataContract';
import { BiFolderPlus, BiImageAdd } from 'react-icons/bi';
import { GrCertificate } from 'react-icons/gr';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';

const Experience = () => {
  const pathname = useSearchParams();
  const router = useRouter();
  const { address } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [fileBannerImage, setFileBannerImage] = useState<string>('Tải tệp lên');
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
  const [loadingBanner, setLoadingBanner] = useState<boolean>(false);
  const [tokenLink, setTokenLink] = useState('');
  const [fontFamily, setFontFamily] = useState<string>('Dancing Script');
  const [fontSize, setFontSize] = useState<string>('40');

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

  const handleImageBannerChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setLoading(true);
      setFileBannerImage(file.name);
      try {
        const imageUrl = await uploadImageToPinata(file);
        setImage(imageUrl);
      } catch (error) {
        // eslint-disable-next-line no-console
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
    if (!address) {
      alert('Please connect your wallet.');
      return;
    }

    setLoadingButton(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(collectionContractAddress, ABI, signer);

      const mintDataArray = await Promise.all(
        (coppyCsvDataFromChild.length > 0 ? coppyCsvDataFromChild : dataFromMintSingle).map(
          async (data) => {
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

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            return [
              address,
              data.fullname,
              data.certificateNumber,
              tokenURI,
              [issuedDate, bannerImage],
            ];
          }
        )
      );

      if (mintDataArray) {
        const tx = await contract.mintBulk(mintDataArray, {
          gasLimit: 4000000,
        });

        await tx.wait();
        alert('Chứng chỉ được tạo thành công!');
        setLoading(true);
        await saveMintData(mintDataArray, collectionContractAddress, fontSize, fontFamily);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error minting NFTs:', error);
      alert('lỗi tạo chứng chỉ.');
      setLoadingButton(false);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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
            <h1 className="text-2xl font-semibold">Quay lại</h1>
          </div>
          <div className="flex space-x-6 rounded-xl bg-white p-4">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full space-y-4 rounded-lg bg-white">
                <div className="flex items-center justify-start gap-4">
                  <div className="h-1/2 w-1/2 space-y-2 ">
                    <label className="block text-base font-bold text-gray-700">
                      Hình chứng chỉ
                    </label>
                    <p className="text-xs text-gray-400">
                      Tải mẫu chứng chỉ mà bạn đã tùy chỉnh lên đây
                    </p>
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
                              className="hidden"
                              id="file-upload"
                            />
                            <div className="flex items-center gap-4">
                              <label
                                htmlFor="file-upload"
                                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
                              >
                                <BiImageAdd className="text-2xl text-gray-800" />
                                Chọn tệp
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
                  {/* preview */}
                  <div className="sticky h-fit w-1/2" style={{ top: `${top}px` }}>
                    <div className="block text-base font-bold text-gray-700">
                      Bản xem trước chứng chỉ
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Sau khi tải mẫu chứng chỉ sẽ hiện ở đây
                    </p>
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
                  <label className="block w-1/2 text-base font-bold text-gray-700">Vai trò</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'Teacher' | 'Student')}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">
                    Ngày phát hành chứng chỉ
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
                    Lưu chứng chỉ số vào
                  </label>
                  <select
                    onChange={(e) => setcollectionContractAddress(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
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
                  <label className="block w-1/2 text-base font-bold text-gray-700">Phông chữ</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  >
                    <option value="MonteCarlo">MonteCarlo</option>
                    <option value="Noto Serif">Noto Serif</option>
                    <option value="Crimson Text">Crimson Text</option>
                    <option value="Great Vibes">Great Vibes</option>
                    <option value="Dancing Script">Dancing Script</option>
                    <option value="EB Garamond">EB Garamond</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Roboto">Roboto</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 space-y-2">
                  <label className="block w-1/2 text-base font-bold text-gray-700">Cỡ chữ</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    required
                    className="mt-1 block w-1/2 rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                    placeholder="Nhập cỡ chữ (vd: 16)"
                  />
                </div>
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
                <ButtonPrimary
                  type="submit"
                  className="flex items-center gap-2 text-white"
                  disabled={loadingButton}
                >
                  <GrCertificate className="text-lg text-white" />
                  {loadingButton ? 'Đang xử lý...' : 'Tạo chứng chỉ'}
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
