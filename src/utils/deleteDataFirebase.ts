import { ref, remove } from 'firebase/database';

import { db } from '@/lib/firebase';

export async function deleteDataById(path: string, id: string) {
  const dataRef = ref(db, `${path}/${id}`);

  try {
    await remove(dataRef);
    alert(`Dữ liệu đã được xóa thành công.`);
  } catch (error) {
    alert('Lỗi khi xóa dữ liệu');
  }
}
