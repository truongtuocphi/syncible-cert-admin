/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { useAccount } from 'wagmi';

import ABI from '@/contract/ABI.json';
import { db, ref, get, onAuthStateChanged, auth } from '@/lib/firebase';
import { uploadMetadata } from '@/lib/pinata';
import { saveMintData } from '@/utils/saveMintData';
import { User } from 'firebase/auth';
import { onValue, query, orderByChild, equalTo } from 'firebase/database';

interface Collection {
  id: string;
  displayName: string;
  contractAddress: string;
}

type Folder = {
  id: string;
  name: string;
};

interface Template {
  authorizingOrgName: string;
  description: string;
  headOrgName: string;
  headOrgPosition: string;
  id: number;
  name: string;
  selectedTemplate: string;
  signatureIpfsHash: string;
  templateIpfsHash: string;
}

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL is not defined');
}

const CreateNFT = ({ templateData }: any) => {
  const router = useRouter();
  const { address } = useAccount();

  const [selectedContract, setSelectedContract] = useState<Collection[]>([]);
  const [collectionContractAddress, setcollectionContractAddress] = useState('');

  const [fullName, setFullName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [certificateNumber, setCertificateNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [blockchain, setBlockchain] = useState<'Polygon' | 'Ethereum'>(
    templateData?.blockchain || 'Polygon'
  );
  const [role, setRole] = useState<'Teacher' | 'Student'>('Student');
  const [tokenLink, setTokenLink] = useState('');

  const [authorizingOrgName, setAuthorizingOrgName] = useState(
    templateData?.authorizingOrgName || ''
  );
  const [csvData, setCsvData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [selectedFolderTemplate, setSelectedFolderTemplate] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [dataTemplate, setDataTemplate] = useState<Template>();

  const [top, setTop] = useState(20);

  useEffect(() => {
    if (selectedContract.length > 0) {
      // Lấy địa chỉ hợp đồng đầu tiên trong selectedContract
      setcollectionContractAddress(selectedContract[0].contractAddress);
    }
  }, [selectedContract]);

  useEffect(() => {
    if (issuedDate && dataTemplate?.authorizingOrgName) {
      const certificateNum = generateCertificateNumber();
      setCertificateNumber(certificateNum);
    }
  }, [issuedDate, role, dataTemplate?.authorizingOrgName]);

  useEffect(() => {
    if (loading) router.push(`/admin/collection/collectiondetail/${collectionContractAddress}`);
  }, [loading]);

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

  const generateCertificateNumber = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const date = new Date(issuedDate);
    const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const roleCode = role === 'Teacher' ? 'TC' : 'SC';
    return `${randomString}/${formattedDate}-${roleCode}-${dataTemplate?.authorizingOrgName}`;
  };

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);

      // Parse CSV file
      Papa.parse(e.target.files[0], {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
        },
        error: () => {
          alert('Failed to parse CSV file!');
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile && !fullName) {
      alert('Please select a CSV file or enter a full name.');
      return;
    }

    if (address) {
      setLoadingButton(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(signer);
        const contract = new ethers.Contract(collectionContractAddress, ABI, signer);

        const mintDataArray = [];

        if (csvFile && csvData.length > 0) {
          for (const data of csvData) {
            const metadata = {
              name: `Certificate for ${data.fullName}`,
              tokenURI: tokenLink,
              attributes: [
                { trait_type: 'Certificate ID', value: certificateNumber },
                { trait_type: 'Role', value: data.role },
                { trait_type: 'Date', value: data.issuedDate },
                { trait_type: 'Organization Name', value: data.authorizingOrgName },
                { trait_type: 'Head Name', value: data.headOrgName },
                { trait_type: 'Head Position', value: data.headOrgPosition },
                { trait_type: 'Head Signature', value: data.signatureIpfsHash },
                { trait_type: 'Description', value: data.description },
                { trait_type: 'Position', value: data.role },
                { trait_type: 'Date Issued', value: data.issuedDate },
                { trait_type: 'Blockchain Type', value: blockchain },
                {
                  trait_type: 'Template URL',
                  value: data.templateIpfsHash ?? data.selectedTemplate,
                },
              ],
            };

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            mintDataArray.push({
              owner: address,
              fullName: data.fullName,
              certificateId: certificateNumber,
              tokenURI: tokenURI,
              certData: {
                organizationName: data.authorizingOrgName,
                headName: data.headOrgName,
                headPosition: data.headOrgPosition,
                headSignature: data.signatureIpfsHash,
                description: data.description,
                position: data.role,
                date: data.issuedDate,
                blockchainType: blockchain,
                templateURL: data.templateIpfsHash ?? data.selectedTemplate,
              },
            });
          }
        } else {
          for (let i = 0; i < quantity; i++) {
            const metadata = {
              name: `Certificate for ${fullName}`,
              attributes: [
                { trait_type: 'Certificate ID', value: certificateNumber },
                { trait_type: 'Role', value: role },
                { trait_type: 'Date', value: issuedDate },
                {
                  trait_type: 'Organization Name',
                  value: dataTemplate?.authorizingOrgName ?? 'N/A',
                },
                { trait_type: 'Head Name', value: dataTemplate?.headOrgName ?? 'N/A' },
                { trait_type: 'Head Position', value: dataTemplate?.headOrgPosition ?? 'N/A' },
                { trait_type: 'Head Signature', value: dataTemplate?.signatureIpfsHash ?? 'N/A' },
                { trait_type: 'Description', value: dataTemplate?.description ?? 'N/A' },
                { trait_type: 'Position', value: role },
                { trait_type: 'Date Issued', value: issuedDate },
                { trait_type: 'Blockchain Type', value: blockchain },
                {
                  trait_type: 'Template URL',
                  value: dataTemplate?.templateIpfsHash ?? dataTemplate?.selectedTemplate,
                },
              ],
            };

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            mintDataArray.push({
              owner: address,
              fullName: fullName,
              certificateId: certificateNumber,
              tokenURI: tokenURI,
              certData: {
                organizationName: dataTemplate?.authorizingOrgName ?? 'N/A',
                headName: dataTemplate?.headOrgName ?? 'N/A',
                headPosition: dataTemplate?.headOrgPosition ?? 'N/A',
                headSignature: dataTemplate?.signatureIpfsHash ?? 'N/A',
                description: dataTemplate?.description ?? 'N/A',
                position: role,
                date: issuedDate,
                blockchainType: blockchain,
                templateURL: dataTemplate?.templateIpfsHash ?? dataTemplate?.selectedTemplate,
              },
            });
          }
        }

        const tx = await contract.mintBulk(mintDataArray, {
          gasLimit: 8000000,
        });

        await tx.wait();
        alert('NFTs minted successfully!');
        setLoading(true);

        await saveMintData(mintDataArray, collectionContractAddress);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error minting NFTs:', error);
        alert('Failed to mint NFTs.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please connect your wallet.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const foldersRef = ref(db, 'folders');
      const userFoldersQuery = query(foldersRef, orderByChild('createdBy'), equalTo(user.uid));

      const unsubscribe = onValue(
        userFoldersQuery,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const folderList: Folder[] = Object.entries(data).map(([id, folderData]) => ({
              id,
              name: (folderData as { name: string }).name,
            }));
            setFolders(folderList);
          } else {
            setFolders([]);
          }
        },
        (error) => {
          console.error('Error fetching folders:', error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (selectedFolder) {
      const fetchData = async () => {
        try {
          const folderRef = ref(db, `folders/${selectedFolder}/data_define`);
          const snapshot = await get(folderRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const dataWithId = Object.keys(data).map((id) => ({
              id,
              ...data[id],
            }));
            setData(dataWithId);
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [selectedFolder]);

  useEffect(() => {
    if (selectedFolderTemplate) {
      data.map((item) => {
        item.id === selectedFolderTemplate ? setDataTemplate(item) : null;
      });
    }
  }, [selectedFolderTemplate]);

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY > 5 ? 100 : 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex gap-4">
      <div className="mx-auto w-1/2 space-y-4 rounded-xl bg-white p-4 text-black">
        <h2 className="text-2xl font-bold">Create NFT</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Folder:
              <div className="flex items-center justify-between gap-4">
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  required
                  className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
                /
                <select
                  value={selectedFolderTemplate}
                  onChange={(e) => setSelectedFolderTemplate(e.target.value)}
                  required
                  disabled={!selectedFolder ? true : false}
                  className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a template</option>
                  {data.map((temp) => (
                    <option key={temp.id} value={temp.id}>
                      {temp.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name or upload CSV"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload CSV (optional):
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvChange}
                className="mt-1 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issued Date:
              <input
                type="date"
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blockchain:
              <select
                value={blockchain}
                onChange={(e) => setBlockchain(e.target.value as 'Polygon' | 'Ethereum')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Polygon">Polygon</option>
                <option value="Ethereum">Ethereum</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collection
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
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role:
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'Teacher' | 'Student')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certificate Number:
              <input
                type="text"
                value={certificateNumber}
                disabled
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loadingButton}
            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loadingButton ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Mint'
            )}
          </button>
        </form>
      </div>

      <div className="sticky h-fit w-[50%] rounded-xl bg-white p-4" style={{ top: `${top}px` }}>
        <h2 className="mb-1 text-lg font-bold text-gray-600">Preview</h2>
        <div className="relative h-[360px] w-full overflow-hidden">
          {dataTemplate?.selectedTemplate || dataTemplate?.templateIpfsHash ? (
            <img
              src={
                dataTemplate?.templateIpfsHash
                  ? `${headerURL}/ipfs/${dataTemplate?.templateIpfsHash}`
                  : `${headerURL}/ipfs/${dataTemplate?.selectedTemplate}`
              }
              alt="Certificate Template"
              className="h-full w-full rounded-lg"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-100">
              <p className="text-sm font-semibold text-gray-600">Preview of your Template</p>
            </div>
          )}

          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            {dataTemplate?.selectedTemplate ? (
              <div className="absolute top-[15%] text-center">
                <h1 className="text-[2vw] font-bold">CHỨNG NHẬN</h1>
                <p className="text-[0.7vw]">{`Số: ${certificateNumber}`}</p>
                <h1 className="text-[1.8vw] font-bold">{fullName}</h1>
                <p className="mt-0 text-center text-[1vw]">
                  Đã hoàn thành khóa đào tạo
                  <br />“{dataTemplate?.description}”
                </p>
                <span className="mt-2 text-[0.7vw]">xx-xx-xxxx</span>
              </div>
            ) : null}

            <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
              {dataTemplate?.authorizingOrgName && (
                <>
                  <img
                    src={`${headerURL}/ipfs/${dataTemplate?.signatureIpfsHash}`}
                    alt="Head Signature"
                    className="w-[4vw]"
                  />
                  <div className="text-center">
                    <p className="text-[0.8vw]">{dataTemplate?.headOrgName}</p>
                    <p className="text-[0.8vw]">{`${dataTemplate?.headOrgPosition} tổ chức ${dataTemplate?.authorizingOrgName}`}</p>
                    <p className="text-[0.8vw]">{`Giấy chứng nhận số: xxx-xxx`}</p>
                    <p className="text-[0.8vw]">{`của ${dataTemplate?.authorizingOrgName}, cấp ngày xx-xx-xxxx`}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
