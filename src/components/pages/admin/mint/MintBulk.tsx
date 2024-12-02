/* eslint-disable no-unused-vars */
'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import getAcronym from '@/utils/getAcronym';
import { BiFolderPlus } from 'react-icons/bi';
import { useTranslations } from 'next-intl';

const headerURLPinata = process.env.NEXT_PUBLIC_HEADER_URL;

interface MintBulkProps {
  DataIssuedDate: string;
  DataRole: string;
  onCsvRead: (data: any[]) => void;
}

interface CertificateData {
  certificateNumber?: string;
  fullname?: string;
  gmail?: string;
}

export const MintBulk = ({ DataIssuedDate, DataRole, onCsvRead }: MintBulkProps) => {
  const [csvData, setCsvData] = useState<CertificateData[]>([]);
  const [fileNameCSV, setFileNameCSV] = useState<string | null>('');

  const t = useTranslations('Dapp.mintNFT');

  const handleDownload = async () => {
    const fileUrl = `${headerURLPinata}/ipfs/QmNqCVoNQ4wuPZfsJp8KNyDw5Tk3CbhC2R77cRJt9jmuCt`;
    const fileName = 'sample.xlsx';

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
      console.error('Download failed:', error);
    }
  };

  const handleCSVChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Lấy đuôi file (extension)

      if (fileExtension === 'csv') {
        // Xử lý file CSV
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const certificateData = results.data
              .filter((data: any) => data.fullname && data.gmail) // Kiểm tra dữ liệu hợp lệ
              .map((data: any) => ({
                certificateNumber: generateCertificateNumber(DataIssuedDate, DataRole),
                fullname: data.fullname,
                gmail: data.gmail,
              }));

            if (certificateData.length === 0) {
              alert('Không có dữ liệu hợp lệ trong file CSV!');
            } else {
              onCsvRead(certificateData);
              setCsvData(certificateData);
            }
          },
          error: () => {
            alert('Chuyển đổi file CSV thất bại!');
          },
        });
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Xử lý file Excel
        const reader = new FileReader();
        reader.onload = (e) => {
          const target = e.target;
          if (target && target.result) {
            const data = new Uint8Array(target.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Chuyển đổi sheet thành mảng JSON
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(excelData); // Kiểm tra dữ liệu Excel sau khi chuyển đổi

            if (excelData.length <= 1) {
              alert('File Excel không chứa dữ liệu hợp lệ!');
              return;
            }

            // Lấy dữ liệu từ cột fullname (A) và email (B)
            const certificateData = excelData
              .slice(1) // Bỏ qua hàng header đầu tiên
              .filter((row: any) => row[0] && row[1]) // Kiểm tra cột fullname và email không trống
              .map((row: any) => ({
                certificateNumber: generateCertificateNumber(DataIssuedDate, DataRole),
                fullname: row[0], // Cột A - fullname
                email: row[1], // Cột B - email
              }));

            if (certificateData.length === 0) {
              alert('Không có dữ liệu hợp lệ trong file Excel!');
            } else {
              onCsvRead(certificateData);
              setCsvData(certificateData);
            }
          } else {
            alert('Không thể đọc file!');
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('Định dạng file không hợp lệ! Vui lòng tải lên file CSV hoặc Excel.');
      }
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

      <div className="block text-base font-medium text-gray-700">{t('titleCSV')}</div>
      <p className="mt-3 text-sm text-gray-400">{t('subTitleCSV')}</p>
      <div
        onClick={handleDownload}
        className="mt-3 block cursor-pointer border-none bg-transparent text-base font-medium text-primary-50 underline"
      >
        {t('buttonUploadFileCSV')}
      </div>

      <div className="my-6 w-full border-[0.5px] border-gray-100"></div>

      <div className="flex items-center justify-between">
        <label className="block text-base font-medium text-gray-900">{t('downloadFileCSV')}</label>
        <div className="space-y-2">
          <input
            type="file"
            onChange={(e) => handleCSVChange(e)}
            accept=".csv,.xlsx"
            required
            className="hidden"
            id="file-upload-csv"
          />
          <div className="flex items-center gap-4">
            <label
              htmlFor="file-upload-csv"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
            >
              <BiFolderPlus className="text-2xl text-gray-800" />
              {t('downloadFileCSV')}
            </label>
            {fileNameCSV && `${fileNameCSV?.slice(0, 4)}...${fileNameCSV?.slice(-8)}`}
          </div>
        </div>
      </div>

      <div className="mt-5 w-full overflow-hidden rounded-3xl bg-gray-100">
        <div className="flex gap-2 bg-gray-200 px-6 py-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-base font-medium text-gray-800">
              {t('titleIDCertificate')}
            </label>
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-base font-medium text-gray-800">
              {t('titleFullName')}
            </label>
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
                        placeholder={t('placeholderID')}
                        value={data.certificateNumber}
                        disabled
                        className="mt-1 block w-full bg-transparent px-6 py-4 sm:text-base"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        required
                        placeholder={t('placeholderFullName')}
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
                placeholder={t('placeholderID')}
                disabled
                className="mt-1 block w-full rounded-md border-none px-6 py-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                required
                placeholder={t('placeholderFullName')}
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
