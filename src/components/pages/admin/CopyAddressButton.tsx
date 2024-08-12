import { useState } from 'react';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

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
      className="w-fit cursor-pointer border-2 border-gray-200 bg-transparent hover:bg-transparent"
    >
      {copied ? (
        <div className="font-bold text-purple-500">Copied!</div>
      ) : (
        <div className="font-bold text-gray-500">{`${textToCopy.slice(0, 4)}...${textToCopy.slice(-6)}`}</div>
      )}
    </ButtonPrimary>
  );
}
