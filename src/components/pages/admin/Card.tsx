import ButtonPrimary from '@/components/common/button/ButtonPrimary';

export default function Card({ data }: any) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-xl bg-white px-6 py-8 shadow-xl shadow-gray-300">
      <div>
        <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-b from-blue-700 to-blue-500 shadow-md shadow-blue-600">
          {data.icon}
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-gray-800">{data.title}</h2>
          <div className="w-1/5 border-[2px] border-blue-500 shadow-md shadow-blue-600"></div>
          <p className="text-sm text-gray-500">{data.des}</p>
        </div>
      </div>
      <ButtonPrimary className="mt-5 w-full bg-blue-600">{data.titleButton}</ButtonPrimary>
    </div>
  );
}
