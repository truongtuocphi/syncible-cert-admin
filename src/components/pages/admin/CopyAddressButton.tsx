import { useState } from 'react';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { SiPolygon } from 'react-icons/si';

export default function CopyAddressButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ButtonPrimary
      onClick={handleCopy}
      className="w-fit cursor-pointer bg-transparent hover:bg-transparent border-none"
    >
      {copied ? (
        <div className="text-purple-500">Copied!</div>
      ) : (
        <div className="flex items-center gap-2 text-gray-700">
          <div className="rounded-full bg-[#EDF0F4] p-2">
            <SiPolygon className="text-lg text-primary-50" />
          </div>
          {`${textToCopy.slice(0, 4)}...${textToCopy.slice(-6)}`}
        </div>
      )}
    </ButtonPrimary>
  );
}
