/* eslint-disable no-console */
import { ref, set } from 'firebase/database';

import { db } from '@/lib/firebase';

export const saveMintData = async (
  mintDataArray: any[],
  collectionContractAddress: string,
  fontSize: any,
  fontFamily: any
) => {
  try {
    const timestamp = Date.now();
    const mintDataRef = ref(db, `mintData/${timestamp}`);

    // Add fontSize and fontFamily to each item in the mintDataArray
    const updatedMintDataArray = mintDataArray.map((mintData) => ({
      ...mintData,
      fontSize, // Add fontSize to each item
      fontFamily, // Add fontFamily to each item
    }));

    const dataToSave = {
      collectionContractAddress,
      mintData: updatedMintDataArray,
    };

    await set(mintDataRef, dataToSave);

    console.log('Mint data saved successfully');
  } catch (error) {
    console.error('Error saving mint data:', error);
    throw new Error('Failed to save mint data.');
  }
};
