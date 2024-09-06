import React from 'react';

export const MintBulk = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="block text-lg font-medium text-gray-700">Thông tin CSV</div>
        <div className="block cursor-pointer text-sm font-medium text-blue-700 underline">
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
