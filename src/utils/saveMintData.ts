/* eslint-disable no-console */
import { ref, set } from 'firebase/database';

import { db } from '@/lib/firebase';

export const saveMintData = async (mintDataArray: any[], collectionContractAddress: string) => {
  try {
    const timestamp = Date.now();
    const mintDataRef = ref(db, `mintData/${timestamp}`);

    const dataToSave = {
      collectionContractAddress,
      mintData: mintDataArray,
    };

    await set(mintDataRef, dataToSave);

    console.log('Mint data saved successfully.');
  } catch (error) {
    console.error('Error saving mint data:', error);
    throw new Error('Failed to save mint data.');
  }
};
