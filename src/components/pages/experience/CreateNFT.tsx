import React, { useState, useEffect } from 'react';

import { useAccount } from 'wagmi';

const CreateNFT = ({ templateData }: any) => {
  const { address } = useAccount();

  const [fullName, setFullName] = useState(templateData?.fullName || '');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [certificateNumber, setCertificateNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState(templateData?.issuedDate || '');
  const [quantity, setQuantity] = useState(templateData?.quantity || 1);
  const [blockchain, setBlockchain] = useState<'Polygon' | 'Ethereum'>(
    templateData?.blockchain || 'Polygon'
  );
  const [role, setRole] = useState<'Teacher' | 'Student'>(templateData?.role || 'Student');
  const [authorizingOrgName, setAuthorizingOrgName] = useState(
    templateData?.authorizingOrgName || ''
  );

  useEffect(() => {
    if (templateData) {
      setFullName(templateData.fullName || '');
      setIssuedDate(templateData.issuedDate || '');
      setQuantity(templateData.quantity || 1);
      setBlockchain(templateData.blockchain || 'Polygon');
      setRole(templateData.role || 'Student');
      setAuthorizingOrgName(templateData.authorizingOrgName || '');
    }
  }, [templateData]);

  useEffect(() => {
    if (issuedDate && authorizingOrgName) {
      const certificateNum = generateCertificateNumber();
      setCertificateNumber(certificateNum);
    }
  }, [issuedDate, role, authorizingOrgName]);

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const generateCertificateNumber = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const date = new Date(issuedDate);
    const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const roleCode = role === 'Teacher' ? 'TC' : 'SC';
    return `${randomString}/${formattedDate}-${roleCode}-${authorizingOrgName}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile && !fullName) {
      alert('Please select a CSV file or enter a full name.');
      return;
    }

    // Handle form submission logic here...
    const data = {
      fullName,
      csvFile,
      issuedDate,
      quantity,
      blockchain,
      role,
      certificateNumber,
      authorizingOrgName,
      address,
    };
    // Call your submission function or API here
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
            NFT Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wallet address:
            <input
              type="text"
              value={address}
              disabled={true}
              required
              placeholder="Connect your wallet"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blockchain:</label>
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => setBlockchain('Polygon')}
              className={`rounded-md px-4 py-2 ${blockchain === 'Polygon' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Polygon
            </button>
            <button
              type="button"
              onClick={() => setBlockchain('Ethereum')}
              className={`rounded-md px-4 py-2 ${blockchain === 'Ethereum' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Ethereum
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Certificate specifically for:
          </label>
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => setRole('Teacher')}
              className={`rounded-md px-4 py-2 ${role === 'Teacher' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Teacher
            </button>
            <button
              type="button"
              onClick={() => setRole('Student')}
              className={`rounded-md px-4 py-2 ${role === 'Student' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Student
            </button>
          </div>
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
          className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Mint
        </button>
      </form>
    </div>
  );
};

export default CreateNFT;
