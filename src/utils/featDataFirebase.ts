import { ref, get } from 'firebase/database';

import { db } from '@/lib/firebase';
import { CollectionData } from '@/types/function';

const fetchDataFirebase = async (
  nameDataBase: string,
  idCertificate?: string,
  nameCertificate?: string
): Promise<CollectionData | null> => {
  const dataRef = ref(db, nameDataBase);

  try {
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Nếu có idCertificate, lọc theo idCertificate trong lớp mintData
      if (idCertificate) {
        for (const key in data) {
          if (data[key].mintData) {
            const filteredData = data[key].mintData.find(
              (mint: any) => mint.certificateId === idCertificate
            );

            if (filteredData) {
              // Nếu có nameCertificate, tiếp tục lọc trong mintData
              if (nameCertificate) {
                const nameFilteredData = data[key].mintData.find(
                  (mint: any) =>
                    mint.fullName === nameCertificate ||
                    mint.certData.description === nameCertificate
                );

                if (nameFilteredData) {
                  return {
                    ...data[key],
                    mintData: [nameFilteredData], // Chỉ trả về kết quả phù hợp
                  };
                } else {
                  console.log('No data found for this certificate name within the specified ID');
                  return null;
                }
              }
              return {
                ...data[key],
                mintData: [filteredData], // Chỉ trả về kết quả phù hợp
              } as CollectionData;
            }
          }
        }

        console.log('No data found for this certificate ID');
        return null;
      }

      // Nếu chỉ có nameCertificate, lọc trong tất cả dữ liệu
      if (nameCertificate) {
        for (const key in data) {
          if (data[key].mintData) {
            const nameFilteredData = data[key].mintData.find(
              (mint: any) =>
                mint.fullName === nameCertificate || mint.certData.description === nameCertificate
            );

            if (nameFilteredData) {
              return {
                ...data[key],
                mintData: [nameFilteredData], // Chỉ trả về kết quả phù hợp
              } as CollectionData;
            }
          }
        }

        console.log('No data found for this certificate name');
        return null;
      }

      // Trả về tất cả dữ liệu nếu không có bộ lọc
      return data as CollectionData;
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default fetchDataFirebase;
