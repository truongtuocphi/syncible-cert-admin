// hooks/usePreventDevTools.ts
import { useEffect, useRef } from 'react';
import { preventDevTools } from '@/utils/preventDevTools';

export const usePreventDevTools = () => {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cleanup = preventDevTools();
      if (cleanup) {
        cleanupRef.current = cleanup;
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};
