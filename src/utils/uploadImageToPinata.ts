import Pinata from '@pinata/sdk';

const pinata = new Pinata(
  process.env.NEXT_PUBLIC_PINATA_API_KEY,
  process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
);

export const uploadImageToPinata = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await pinata.pinFileToIPFS(formData, {
      pinataMetadata: {
        name: file.name,
      },
    });

    const { IpfsHash } = response;
    return `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  } catch (error) {
    console.error('Error uploading file to Pinata', error);
    throw error;
  }
};
