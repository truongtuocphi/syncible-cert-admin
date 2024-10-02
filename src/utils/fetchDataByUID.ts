import { ref, get } from 'firebase/database';

import { db } from '@/lib/firebase';

interface UserInfo {
  firstName?: string;
  lastName?: string;
  institution?: string;
  email?: string;
  createdAt?: string;
}

const fetchDataByUid = async (uid: string): Promise<UserInfo | null> => {
  const dataRef = ref(db, `users/${uid}`);

  try {
    // Lấy dữ liệu từ Realtime Database
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      // Trả về dữ liệu nếu tồn tại
      return snapshot.val();
    } else {
      // Nếu không có dữ liệu
      console.log('No data available');
      return null;
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchDataByUid;
