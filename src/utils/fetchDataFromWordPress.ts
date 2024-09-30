import axios from 'axios';

export const fetchPaginatedDataFromWP = async (url: string) => {
  try {
    const response = await axios.get(url);

    const data = response.data;
    const totalPages = response.headers['x-wp-totalpages'];

    // console.log(data);

    return { data, totalPages };
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
};

export const fetchDataFromWP = async (url: string) => {
  try {
    const response = await axios.get(url);

    const data = response.data;

    // console.log(data);

    return data;
  } catch (error) {
    console.error('Error while fetching data:', error);
    throw error;
  }
}