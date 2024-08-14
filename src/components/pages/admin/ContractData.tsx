/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

import { HiTemplate } from 'react-icons/hi';

import { db, ref, get } from '@/lib/firebase';
import configDate from '@/utils/configDate';

interface Props {
  collectionContractAddress: string;
  // eslint-disable-next-line no-unused-vars
  onItemsCountChange: (count: number) => void;
}

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

const ContractData: React.FC<Props> = ({ collectionContractAddress, onItemsCountChange }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'mintData');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const dataFromFirebase = snapshot.val();
          const matchingData = Object.values(dataFromFirebase).filter(
            (item: any) => item.collectionContractAddress === collectionContractAddress
          );

          if (matchingData) {
            setData(matchingData);
            onItemsCountChange(matchingData.length);
          } else {
            setError('No matching data found.');
          }
        } else {
          setError('No data available in Firebase.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data from Firebase.');
      } finally {
        setLoading(false);
      }
    };

    if (collectionContractAddress) {
      fetchData();
    }
  }, [collectionContractAddress]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="flex flex-col items-center gap-2">
        <HiTemplate className="text-7xl text-gray-500" />
        <div className="text-lg font-semibold text-gray-500">No Item</div>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-6">
      {data ? (
        <>
          {data.map((item, index) => {
            return (
              <div className="relative w-full overflow-hidden" key={index}>
                <img
                  src={`${headerURL}/ipfs/${item.mintData[0].certData.templateURL}`}
                  alt="Certificate Template"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ fontFamily: 'Times New Roman, serif' }}
                >
                  <div className="absolute top-[15%] text-center">
                    <h1 className="text-[1.5vw] font-bold">CHỨNG NHẬN</h1>
                    <p className="text-[0.7vw]">{`Số: ${item.mintData[0].certificateId}`}</p>
                    <h1 className="text-[2vw] font-bold">{item.mintData[0].fullName}</h1>
                    <p className="mt-2 text-center text-[1vw]">
                      Đã hoàn thành khóa đào tạo ngắn hạn
                      <br />
                      “ỨNG DỤNG AI TRONG QUẢN LÝ HÀNH CHÍNH”
                    </p>
                    <span className="mt-2 text-[0.8vw]">
                      {configDate(item.mintData[0].certData.date)}
                    </span>
                  </div>
                  <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
                    <img
                      src={`${headerURL}/ipfs/${item.mintData[0].certData.headSignature}`}
                      alt="Head Signature"
                      className="w-[5vw]"
                    />
                    <div className="text-center">
                      <p className="text-[0.8vw]">{item.mintData[0].certData.headName}</p>
                      <p className="text-[0.8vw]">{`${item.mintData[0].certData.headPosition} tổ chức ${item.mintData[0].certData.organizationName}`}</p>
                      <p className="text-[0.8vw]">{`Giấy chứng nhận số: ${item.mintData[0].certificateId}`}</p>
                      <p className="text-[0.8vw]">{`của ${item.mintData[0].certData.organizationName}, cấp ngày ${item.mintData[0].certData.date}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <HiTemplate className="text-7xl text-gray-500" />
          <div className="text-lg font-semibold text-gray-500">No Item</div>
        </div>
      )}
    </div>
  );
};

export default ContractData;
