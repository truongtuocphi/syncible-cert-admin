import React from 'react';

export const MintSingleForm = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-2 space-y-2">
        <label>ID chứng chỉ</label>
        <input
          type="text"
          required
          placeholder="Mã chứng chỉ"
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
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
