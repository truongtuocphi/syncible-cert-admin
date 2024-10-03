'use client';

import { useEffect, useState } from 'react';

import getAcronym from '@/utils/getAcronym';
import { useTranslations } from 'next-intl';

interface MintBulkProps {
  DataIssuedDate: string;
  DataRole: string;
  onGetData: (data: any[]) => void;
}

interface CertificateData {
  certificateNumber: string;
  fullname: string;
}

export const MintSingleForm = ({ DataIssuedDate, DataRole, onGetData }: MintBulkProps) => {
  const [name, setName] = useState<string>('');
  const [certificateNumber, setCertificateNumber] = useState<string>('');

  const t = useTranslations('Dapp.mintNFT');

  useEffect(() => {
    setCertificateNumber(generateCertificateNumber(DataIssuedDate, DataRole));
  }, [DataIssuedDate, DataRole]);

  const generateCertificateNumber = (issuedDate: string, role: string) => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const date = new Date(issuedDate);
    const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const roleCode = role === 'Teacher' ? 'TC' : 'SC';
    return `${randomString}/${formattedDate}-${roleCode}-${getAcronym('Syn ci ble')}`;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    const certificateData: CertificateData[] = [
      { certificateNumber: certificateNumber, fullname: newName },
    ];
    onGetData(certificateData);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1 space-y-2">
        <label className="text-base font-bold text-gray-700">{t('titleIDCertificate')}</label>
        <input
          type="text"
          required
          placeholder={t('PlaceholderID')}
          value={certificateNumber}
          disabled
          className="mt-1 block w-full rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-1 space-y-2">
        <label className="text-base font-bold text-gray-700">{t('titleFullName')}</label>
        <input
          type="text"
          required
          placeholder={t('placeholderFullName')}
          value={name}
          onChange={handleNameChange}
          className="mt-1 block w-full rounded-2xl border border-gray-300 px-2 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
