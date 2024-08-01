// utils/pinata.js
import PinataClient from '@pinata/sdk';

const pinata = new PinataClient(
  process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
  process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY as string
);

export const uploadImageToPinata = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading image to Pinata:', error);
    throw error;
  }
};
