/* eslint-disable no-console */
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
      const data = snapshot.val(); // Giữ nguyên cấu trúc gốc

      // Tìm kiếm theo certificateId nếu được cung cấp
      if (idCertificate) {
        for (const key in data) {
          const entry = data[key];

          // Kiểm tra xem 'entry' có phải là object và có thuộc tính 'mintData'
          if (typeof entry === 'object' && entry !== null && 'mintData' in entry) {
            const entryWithMintData = entry as { mintData: any[] };

            // Lọc các mintData theo idCertificate
            const filteredData = entryWithMintData.mintData.filter((mint) => {
              return mint[2] === idCertificate; // Cập nhật để lấy idCertificate từ chỉ số phù hợp
            });

            if (filteredData.length > 0) {
              // Nếu nameCertificate cũng được cung cấp, lọc tiếp theo tên
              if (nameCertificate) {
                const nameFilteredData = filteredData.filter(
                  (mint) => mint[1] === nameCertificate // Sử dụng chỉ số phù hợp
                );

                if (nameFilteredData.length > 0) {
                  return {
                    ...entryWithMintData,
                    mintData: nameFilteredData,
                  };
                } else {
                  console.log('No data found for this certificate name within the specified ID');
                  return null;
                }
              }

              // Nếu không có nameCertificate, trả về các dữ liệu theo idCertificate
              return {
                ...entryWithMintData,
                mintData: filteredData,
              } as CollectionData;
            }
          }
        }

        console.log('No data found for this certificate ID');
        return null;
      }

      // Nếu không có idCertificate, tìm kiếm theo nameCertificate
      if (nameCertificate) {
        let allNameFilteredData: any[] = []; // Khởi tạo mảng để chứa tất cả các kết quả trùng tên

        for (const key in data) {
          const entry = data[key];

          // Kiểm tra xem 'entry' có phải là object và có thuộc tính 'mintData'
          if (typeof entry === 'object' && entry !== null && 'mintData' in entry) {
            const entryWithMintData = entry as { mintData: any[] };

            // Tìm kiếm theo fullname
            const nameFilteredData = entryWithMintData.mintData.filter(
              (mint) => mint[1] === nameCertificate // Sử dụng chỉ số phù hợp
            );

            if (nameFilteredData.length > 0) {
              allNameFilteredData = [...allNameFilteredData, ...nameFilteredData];
            }
          }
        }

        if (allNameFilteredData.length > 0) {
          return {
            mintData: allNameFilteredData, // Trả về toàn bộ các mục trùng tên
          } as CollectionData;
        } else {
          console.log('No data found for this certificate name');
          return null;
        }
      }

      // Nếu không có điều kiện nào được đưa ra, trả về toàn bộ dữ liệu
      return data as unknown as CollectionData;
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
