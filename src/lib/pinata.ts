/* eslint-disable no-console */
import PinataClient from '@pinata/sdk';

const pinata = new PinataClient(
  process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
  process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY as string
);

export const uploadImageToPinata = async (file: File) => {
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
      throw new Error(`Pinata error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
};

export const uploadMetadata = async (data: any) => {
  try {
    // Define metadata structure with additional attributes
    const dataNFT = data.attributes;

    // console.log(dataNFT);

    const metadata = {
      fullname: data.fullname ? data.fullname : 'Default Name',
      attributes: [
        { trait_type: 'Certificate ID', value: dataNFT[0].value || 'NaN' },
        { trait_type: 'role', value: dataNFT[1].value || 'NaN' },
        { trait_type: 'Date', value: dataNFT[2].value || 'NaN' },
        { trait_type: 'Template URL', value: dataNFT[3].value || 'NaN' },
        { trait_type: 'Font', value: dataNFT[4].value || 'NaN' },
        { trait_type: 'Font Size', value: dataNFT[5].value || 'NaN' },
      ],
    };

    // Convert metadata to JSON
    const metadataJson = JSON.stringify(metadata);

    // Convert JSON to a Blob
    const blob = new Blob([metadataJson], { type: 'application/json' });

    // Use Pinata's `pinJSONToIPFS` endpoint to upload JSON metadata
    const formData = new FormData();
    formData.append('file', blob, 'metadata.json');

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Pinata error: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading metadata to Pinata:', error);
    throw error;
  }
};
