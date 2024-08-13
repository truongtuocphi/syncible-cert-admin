import { ref, set } from 'firebase/database';

import { db } from '@/lib/firebase'; // Thay đổi đường dẫn nếu cần

export const saveMintData = async (mintDataArray: any[], collectionContractAddress: string) => {
  try {
    // Tạo một tham chiếu đến vị trí dữ liệu trong Firebase
    const timestamp = Date.now();
    const mintDataRef = ref(db, `mintData/${timestamp}`);

    // Tạo dữ liệu để lưu
    const dataToSave = {
      collectionContractAddress,
      mintData: mintDataArray,
    };

    // Lưu dữ liệu vào Firebase
    await set(mintDataRef, dataToSave);

    console.log('Mint data saved successfully.');
  } catch (error) {
    console.error('Error saving mint data:', error);
    throw new Error('Failed to save mint data.');
  }
};
