import Pinata from '@pinata/sdk';

// Khởi tạo Pinata SDK với API Key và Secret API Key từ biến môi trường
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
    // Tạo FormData để gửi tệp ảnh
    const formData = new FormData();
    formData.append('file', file);

    // Gửi yêu cầu tải ảnh lên Pinata
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

    // Nhận dữ liệu phản hồi và trích xuất URL
    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading image to Pinata:', error);
    throw error;
  }
}
