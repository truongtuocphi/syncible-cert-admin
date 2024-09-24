/* eslint-disable no-unused-vars */
'use client';

import { useState } from 'react';

import Papa from 'papaparse';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import getAcronym from '@/utils/getAcronym';
import { BiFolderPlus, BiImageAdd } from 'react-icons/bi';

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
  const [fileNameCSV, setFileNameCSV] = useState<string | null>('');

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
      setFileNameCSV(file.name);
      Papa.parse<string>(file, {
        header: true,
        complete: (results) => {
          const certificateData: CertificateData[] = results.data.map((data: any) => ({
            certificateNumber: generateCertificateNumber(DataIssuedDate, DataRole),
            fullname: data.fullname,
            gmail: data.gmail,
          }));

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
      <div className="my-6 w-full border-[0.5px] border-gray-100"></div>

      <div className="block text-base font-medium text-gray-700">Thông tin CSV</div>
      <p className="mt-3 text-sm text-gray-400">
        Định dạng tập tin csv của bạn phải được định dạng theo trường định dạng tập tin của Syncible
        để đảm bảo tính nhất quán. Sau khi đã định dạng tập tin, lưu thành tập tin CSV và dán vào
        mẫu dưới đây.
      </p>
      <div
        onClick={handleDownload}
        className="mt-3 block cursor-pointer border-none bg-transparent text-base font-medium text-primary-50 underline"
      >
        Tải file CSV mẫu
      </div>

      <div className="my-6 w-full border-[0.5px] border-gray-100"></div>

      <div className="flex items-center justify-between">
        <label className="block text-base font-medium text-gray-900">Tải tệp CSV</label>
        <div className="space-y-2">
          <input
            type="file"
            onChange={(e) => handleCSVChange(e)}
            accept=".csv .xlsx"
            required
            className="hidden"
            id="file-upload"
          />
          <div className="flex items-center gap-4">
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
            >
              <BiFolderPlus className="text-2xl text-gray-800" />
              Chọn tệp
            </label>
            {fileNameCSV && `${fileNameCSV?.slice(0, 4)}...${fileNameCSV?.slice(-8)}`}
          </div>
        </div>
      </div>

      <div className="mt-5 w-full overflow-hidden rounded-3xl bg-gray-100">
        <div className="flex gap-2 bg-gray-200 px-6 py-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-base font-medium text-gray-800">ID chứng chỉ</label>
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-base font-medium text-gray-800">Họ và tên</label>
          </div>
        </div>

        {csvData.length > 0 ? (
          <ScrollArea className="h-56 w-full rounded-md border-none">
            {csvData.map(
              (data: any, index) =>
                data.fullname && (
                  <div
                    className="flex items-center gap-2 border-b-[0.5px] border-gray-200"
                    key={index}
                  >
                    <div className="w-1/2">
                      <input
                        type="text"
                        required
                        placeholder="Mã chứng chỉ"
                        value={data.certificateNumber}
                        disabled
                        className="mt-1 block w-full bg-transparent px-6 py-4 sm:text-base"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        required
                        placeholder="Họ và tên của bạn"
                        value={data.fullname}
                        disabled
                        className="mt-1 block w-full bg-transparent py-4 sm:text-base"
                      />
                    </div>
                  </div>
                )
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <input
                type="text"
                required
                placeholder="Mã chứng chỉ"
                disabled
                className="mt-1 block w-full rounded-md border-none px-6 py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                required
                placeholder="Họ và tên của bạn"
                disabled
                className="mt-1 block w-full rounded-md border-none py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
