import Pinata from '@pinata/sdk';

const pinata = new Pinata(
  process.env.NEXT_PUBLIC_PINATA_API_KEY,
  process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
);

/**
 * Hàm upload ảnh lên Pinata
 * @param {File} file - Tệp ảnh để tải lên
 * @returns {Promise<string>} - URL của ảnh đã tải lên
 */

export async function uploadImageToPinata(file: any) {
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

    if (!response.ok) {
      throw new Error(`Error uploading image: ${response.statusText}`);
    }

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error uploading image to Pinata:', error);
    throw error;
  }
}
