/* eslint-disable no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

import getAcronym from '@/utils/getAcronym';

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

  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-2 space-y-2">
        <label>ID chứng chỉ</label>
        <input
          type="text"
          required
          placeholder="Mã chứng chỉ"
          value={certificateNumber}
          disabled
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="col-span-3 space-y-2">
        <label>Họ và tên</label>
        <input
          type="text"
          required
          placeholder="Họ và tên của bạn"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            const certificateData: CertificateData[] = [
              { certificateNumber: certificateNumber, fullname: name },
            ];

            onGetData(certificateData);
          }}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
