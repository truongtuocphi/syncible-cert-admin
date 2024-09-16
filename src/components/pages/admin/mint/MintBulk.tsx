/* eslint-disable no-unused-vars */
'use client';

import { useState } from 'react';

import Papa from 'papaparse';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import getAcronym from '@/utils/getAcronym';

const headerURLPinata = process.env.NEXT_PUBLIC_HEADER_URL;

interface MintBulkProps {
  DataIssuedDate: string;
  DataRole: string;
  onCsvRead: (data: any[]) => void;
}

interface CertificateData {
  certificateNumber: string;
  fullname: string;
  gmail: string;
}

export const MintBulk = ({ DataIssuedDate, DataRole, onCsvRead }: MintBulkProps) => {
  const [csvData, setCsvData] = useState<CertificateData[]>([]);

  const handleDownload = async () => {
    const fileUrl = `${headerURLPinata}/ipfs/QmSusJoDdDnAr5AVocRzLBPhb7yHmeSXCBTJUyGLPekg7R`;
    const fileName = 'Convertio_input.xlsx';

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Download failed:', error);
    }
  };

  const handleCSVChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse<string>(file, {
        header: true,
        // encoding: 'UTF-8',
        complete: (results) => {
          // Prepare certificate data and pass it to the parent
          const certificateData: CertificateData[] = results.data.map((data: any) => ({
            certificateNumber: generateCertificateNumber(DataIssuedDate, DataRole),
            fullname: data.fullname,
            gmail: data.gmail,
          }));

          // Pass certificate data to parent component
          onCsvRead(certificateData);
          setCsvData(certificateData);
        },
        error: () => {
          alert('Chuyển đổi file CSV thất bại!');
        },
      });
    }
  };

  const generateCertificateNumber = (issuedDate: string, role: string) => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const date = new Date(issuedDate);
    const formattedDate = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const roleCode = role === 'Teacher' ? 'TC' : 'SC';
    return `${randomString}/${formattedDate}-${roleCode}-${getAcronym('Syn ci ble')}`;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="block text-lg font-medium text-gray-700">Thông tin CSV</div>
        <div
          onClick={handleDownload}
          className="block cursor-pointer border-none bg-transparent text-sm font-medium text-primary-50 underline"
        >
          Tải file CSV mẫu
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-400">
        Định dạng tập tin csv của bạn phải được định dạng theo trường định dạng tập tin của Syncible
        để đảm bảo tính nhất quán. Sau khi đã định dạng tập tin, lưu thành tập tin CSV và dán vào
        mẫu dưới đây.
      </p>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Tải tệp CSV</label>
        <input
          type="file"
          onChange={(e) => handleCSVChange(e)}
          accept=".csv"
          required
          className="block w-full cursor-pointer rounded-lg border-[1px] text-sm text-gray-500 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-50 hover:file:bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">ID chứng chỉ</label>
        </div>
        <div className="col-span-3 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
        </div>
      </div>

      {csvData.length > 0 ? (
        <ScrollArea className="h-56 w-full rounded-md border-none">
          {csvData.map(
            (data: any, index) =>
              data.fullname && (
                <div className="grid grid-cols-5 gap-2" key={index}>
                  <div className="col-span-2 space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Mã chứng chỉ"
                      value={data.certificateNumber}
                      disabled
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn"
                      value={data.fullname}
                      disabled
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              )
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2 space-y-2">
            <input
              type="text"
              required
              placeholder="Mã chứng chỉ"
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-3 space-y-2">
            <input
              type="text"
              required
              placeholder="Họ và tên của bạn"
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      )}
    </>
  );
};
