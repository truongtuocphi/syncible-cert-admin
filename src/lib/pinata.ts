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
    console.log(dataNFT);
    const metadata = {
      name: data.name, // NFT Name
      attributes: [
        { trait_type: 'Certificate ID', value: dataNFT[0].value || '' },
        { trait_type: 'Organization Name', value: dataNFT[3].value || 'N/a' },
        { trait_type: 'Head Name', value: dataNFT[4].value || '' },
        { trait_type: 'Head Position', value: dataNFT[5].value || '' },
        { trait_type: 'Head Signature', value: dataNFT[6].value || '' },
        { trait_type: 'Description', value: dataNFT[7].value || '' },
        { trait_type: 'Position', value: dataNFT[8].value || '' },
        { trait_type: 'Date', value: dataNFT[9].value || '' },
        { trait_type: 'Blockchain Type', value: dataNFT[10].value || '' },
        { trait_type: 'Template URL', value: dataNFT[11].value || '' },
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
