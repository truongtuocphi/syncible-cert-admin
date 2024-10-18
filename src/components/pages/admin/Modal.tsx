import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { IoClose } from 'react-icons/io5';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const datCard = [
  {
    title: 'title_1',
    description: 'des_1',
    link: '/admin/mintnft?type=mintsingle',
    icon: '/Capa_1.png',
  },
  {
    title: 'title_2',
    description: 'des_2',
    link: '/admin/mintnft?type=mintbulk',
    icon: '/Capa_2.png',
  },
];

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const router = useRouter();

  const t = useTranslations('Dapp.modal');
  const lang = useLocale();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleCreateCertificate = () => {
    if (selectedOption !== null) {
      const targetLink = datCard[selectedOption].link;
      const urlWithLocale = `/${lang}/${targetLink}`;
      router.push(urlWithLocale);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 text-black">
      <div className="relative w-11/12 rounded-lg bg-white p-6 md:max-w-2xl">
        <h2 className="text-center text-xl font-bold text-gray-700">{t('title')}</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {datCard.map((dataCard, index) => (
            <div
              className={`relative flex cursor-pointer flex-col justify-between rounded-lg border-4 text-center shadow-lg transition ${
                selectedOption === index ? 'border-indigo-500 bg-indigo-50' : 'hover:bg-gray-50'
              }`}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <div className="relative z-10">
                <img
                  src={index === 0 ? '/Frame_1.png' : '/Frame_2.png'}
                  alt="Frame_1"
                  className="absolute left-0 top-0 -z-10 object-cover"
                />
                <div className="absolute top-0 p-4">
                  <div className="flex w-full items-center justify-center p-5">
                    <Image
                      src={dataCard.icon}
                      alt="icon"
                      className="w-1/2"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-start">
                    <h3 className="mt-4 text-lg font-bold text-gray-800">{t(dataCard.title)}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                      {t(dataCard.description)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ButtonPrimary
          className="mt-6 w-full text-white disabled:bg-gray-300"
          disabled={selectedOption === null}
          onClick={handleCreateCertificate}
        >
          {t('button')}
        </ButtonPrimary>
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
