import Link from 'next/link';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

const Setting = () => {
  return (
    <div className="mt-14 flex max-w-lg flex-col justify-between gap-7 rounded-xl bg-white p-6 shadow-xl shadow-gray-400">
      <h2 className="text-xl font-bold">Subscription Plan</h2>
      <p className="text-base text-gray-500">
        Your trial ends in <span className="font-bold text-blue-500">31 day</span>
      </p>
      <div className="flex items-center justify-between">
        <ButtonPrimary className="bg-blue-500">Upgrade Plan</ButtonPrimary>
        <Link href={'/admin'} className="text-sm text-gray-500 underline">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Setting;
