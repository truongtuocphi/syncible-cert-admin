import { ref, get } from 'firebase/database';

import { db } from '@/lib/firebase';
import { CollectionData } from '@/types/function';

const fetchDataCollectionById = async (id: string): Promise<CollectionData | null> => {
  const dataRef = ref(db, `collections/${id}`);
  const snapshot = await get(dataRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    // eslint-disable-next-line no-console
    console.log('No data available');
    return null;
  }
};

export default fetchDataCollectionById;
