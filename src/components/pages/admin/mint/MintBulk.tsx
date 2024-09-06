import { useState } from 'react';

const headerURLPinata = process.env.NEXT_PUBLIC_HEADER_URL;

export const MintBulk = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

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
        Định dạng tập tin slxs của bạn phải được định dạng theo trường định dạng tập tin của
        Syncible để đảm bảo tính nhất quán. Sau khi đã định dạng tập tin, lưu thành tập tin CSV và
        dán vào mẫu dưới đây.
      </p>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">ID chứng chỉ</label>
          <input
            type="text"
            required
            placeholder="Mã chứng chỉ"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            required
            placeholder="Mã chứng chỉ"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            required
            placeholder="Mã chứng chỉ"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-3 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            required
            placeholder="Họ và tên của bạn"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            required
            placeholder="Họ và tên của bạn"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            required
            placeholder="Họ và tên của bạn"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </>
  );
};
