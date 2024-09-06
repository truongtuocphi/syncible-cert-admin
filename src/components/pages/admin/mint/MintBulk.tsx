import { useState } from 'react';

import Papa from 'papaparse';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import clsx from 'clsx';

const headerURLPinata = process.env.NEXT_PUBLIC_HEADER_URL;

export const MintBulk = () => {
  const [csvData, setCsvData] = useState<string[]>([]);

  const handleDownload = async () => {
    const fileUrl = `${headerURLPinata}/ipfs/QmfCaendkwSjcKteBFL3Hct2isgCS77K5NAPh5qFCJy8HW`;
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
        encoding: 'UTF-8',
        complete: (results) => {
          setCsvData(results.data);
        },
        error: () => {
          alert('Chuyển đổi file CSV thất bại!');
        },
      });
    }
  };

  console.log(csvData);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="block text-lg font-medium text-gray-700">Thông tin CSV</div>
        <div
          onClick={handleDownload}
          className="block cursor-pointer border-none bg-transparent text-sm font-medium text-blue-700 underline"
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
          accept=".csv, .xlsx"
          required
          className="block w-full cursor-pointer rounded-lg border-[1px] text-sm text-gray-500 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-500 hover:file:bg-blue-100"
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
        <ScrollArea className="h-fit max-h-64 w-full rounded-md border-none">
          {csvData.map((data: any, index) => (
            <div className="grid grid-cols-5 gap-2" key={index}>
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
                  value={data.name}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
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
