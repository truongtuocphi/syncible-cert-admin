import { useEffect } from 'react';

import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { PiCertificateFill } from 'react-icons/pi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const datCard = [
  {
    title: 'Tạo chứng chỉ đơn lẻ',
    description: 'Mục này được thiết kế cho việc cung cấp bằng cấp đơn lẻ dành cho một người.',
    link: '/#',
    icon: <PiCertificateFill />,
  },
  {
    title: 'Tạo chứng chỉ hàng loạt',
    description:
      'Mục này được thiết kế cho việc cung cấp bằng cấp hàng loạt cho khoá học trên một học viên.',
    link: '/#',
    icon: (
      <div className="flex items-center">
        <PiCertificateFill />
        <PiCertificateFill />
      </div>
    ),
  },
];

const Modal = ({ isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 text-black">
      <div className="relative w-11/12 rounded-lg bg-white p-6 md:w-1/2">
        <h2 className="text-center text-xl font-bold text-gray-700">Tạo chứng chỉ</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {datCard.map((dataCard, index) => (
            <div
              className="flex flex-col justify-between rounded-lg border p-4 text-center shadow-lg md:h-80"
              key={index}
            >
              <div>
                <div className="mx-auto flex items-center justify-start text-5xl text-blue-500">
                  {dataCard.icon}
                </div>
                <div className="text-start">
                  <h3 className="mt-4 text-lg font-bold text-gray-800">{dataCard.title}</h3>
                  <div className="my-4 w-1/5 border-[2px] border-blue-500 shadow-md shadow-blue-600"></div>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{dataCard.description}</p>
                </div>
              </div>
              <Link href={dataCard.link}>
                <ButtonPrimary className="w-full">Tạo chứng chỉ</ButtonPrimary>
              </Link>
            </div>
          ))}
        </div>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
