import axios from 'axios';

export const fetchDataFromWordPress = async (url: string) => {
  try {
    const response = await axios.get(url);

    const data = response.data;

    console.log(data);

    return data;
  } catch (error) {
    console.error('Lỗi khi fetch dữ liệu:', error);
    throw error;
  }
};
