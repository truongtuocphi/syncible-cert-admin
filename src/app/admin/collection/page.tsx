import React from 'react';

import { HiTemplate } from 'react-icons/hi';

export default function Collection() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <HiTemplate className="text-7xl text-gray-500" />
        <div className="text-lg font-semibold text-gray-500">No Item</div>
      </div>
    </div>
  );
}
