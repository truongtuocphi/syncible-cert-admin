import { uploadMetadata } from '@/lib/pinata';

// Hàm upload metadata với cơ chế retry
const uploadMetadataWithRetry = async (metadata: any, retries = 3): Promise<string | null> => {
  try {
    const tokenURI = await uploadMetadata(metadata);
    return tokenURI;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries} retries left)`);
      return uploadMetadataWithRetry(metadata, retries - 1);
    } else {
      console.error('Failed to upload metadata after retries:', error);
      return null;
    }
  }
};

export default uploadMetadataWithRetry;
