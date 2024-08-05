import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { useAccount } from 'wagmi';

import ABI from '@/contract/ABI.json';
import { uploadMetadata } from '@/lib/pinata';

const contractAddress = process.env.NEXT_PUBLIC_CERTIFICATE_NFT_CONTRACT;

if (!contractAddress) {
  throw new Error('NEXT_PUBLIC_CERTIFICATE_NFT_CONTRACT is not defined');
}

const CreateNFT = ({ templateData }: any) => {
  const router = useRouter();
  const { address } = useAccount();
  const [fullName, setFullName] = useState(templateData?.fullName || '');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [certificateNumber, setCertificateNumber] = useState('');
  const [tokenLink, setTokenLink] = useState('');
  const [issuedDate, setIssuedDate] = useState(templateData?.issuedDate || '');
  const [quantity, setQuantity] = useState(templateData?.quantity || 1);
  const [blockchain, setBlockchain] = useState<'Polygon' | 'Ethereum'>(
    templateData?.blockchain || 'Polygon'
  );
  const [role, setRole] = useState<'Teacher' | 'Student'>(templateData?.role || 'Student');
  const [authorizingOrgName, setAuthorizingOrgName] = useState(
    templateData?.authorizingOrgName || ''
  );
  const [csvData, setCsvData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (issuedDate && authorizingOrgName) {
      const certificateNum = generateCertificateNumber();
      setCertificateNumber(certificateNum);
    }
  }, [issuedDate, role, authorizingOrgName]);

  useEffect(() => {
    if (!loading) router.push(`/experience/${tokenLink}`);
  }, [loading]);

  const generateCertificateNumber = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const date = new Date(issuedDate);
    const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const roleCode = role === 'Teacher' ? 'TC' : 'SC';
    return `${randomString}/${formattedDate}-${roleCode}-${authorizingOrgName}`;
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
      setLoading(true);

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const mintDataArray = [];

        if (csvFile && csvData.length > 0) {
          for (const data of csvData) {
            const metadata = {
              name: `Certificate for ${data.fullName}`,
              tokenURI: tokenLink,
              attributes: [
                { trait_type: 'Certificate ID', value: generateCertificateNumber() },
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
              certificateId: generateCertificateNumber(),
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
                { trait_type: 'Certificate ID', value: generateCertificateNumber() },
                { trait_type: 'Role', value: role },
                { trait_type: 'Date', value: issuedDate },
                { trait_type: 'Organization Name', value: authorizingOrgName },
                { trait_type: 'Head Name', value: templateData?.headOrgName ?? 'N/A' },
                { trait_type: 'Head Position', value: templateData?.headOrgPosition ?? 'N/A' },
                { trait_type: 'Head Signature', value: templateData?.signatureIpfsHash ?? 'N/A' },
                { trait_type: 'Description', value: templateData?.description ?? 'N/A' },
                { trait_type: 'Position', value: role },
                { trait_type: 'Date Issued', value: issuedDate },
                { trait_type: 'Blockchain Type', value: blockchain },
                {
                  trait_type: 'Template URL',
                  value: templateData?.templateIpfsHash ?? templateData.selectedTemplate,
                },
              ],
            };

            const tokenURI = await uploadMetadata(metadata);
            setTokenLink(tokenURI);

            mintDataArray.push({
              owner: address,
              fullName: fullName,
              certificateId: generateCertificateNumber(),
              tokenURI: tokenURI,
              certData: {
                organizationName: authorizingOrgName,
                headName: templateData?.headOrgName ?? 'N/A',
                headPosition: templateData?.headOrgPosition ?? 'N/A',
                headSignature: templateData?.signatureIpfsHash ?? 'N/A',
                description: templateData?.description ?? 'N/A',
                position: role,
                date: issuedDate,
                blockchainType: blockchain,
                templateURL: templateData?.templateIpfsHash ?? templateData.selectedTemplate,
              },
            });
          }
        }

        const tx = await contract.mintBulk(mintDataArray);
        await tx.wait();
        alert('NFTs minted successfully!');
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

  return (
    <div className="mx-auto max-w-full space-y-4 rounded-xl bg-white p-6 text-black shadow-md">
      <h2 className="text-2xl font-bold">Create NFT</h2>
      <form onSubmit={handleSubmit}>
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
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? (
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
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Mint'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateNFT;
