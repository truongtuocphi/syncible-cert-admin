import { useState } from 'react';

import { LuCopy } from 'react-icons/lu';
import { LuCopyCheck } from 'react-icons/lu';

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
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
    <div onClick={handleCopy} className="cursor-pointer">
      {copied ? (
        <LuCopyCheck className="text-primary-50" />
      ) : (
        <LuCopy className="text-primary-50" />
      )}
    </div>
  );
};

export default CopyButton;
