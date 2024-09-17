/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { HiTemplate } from 'react-icons/hi';

import { db, ref, get } from '@/lib/firebase';
import configDate from '@/utils/configDate';
import CertificatePreview from './CertificatePreview';

interface Props {
  collectionContractAddress: string;
  // eslint-disable-next-line no-unused-vars
  onItemsCountChange: (count: number) => void;
}

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
          const matchingData: any[] = Object.values(dataFromFirebase).filter(
            (item: any) => item.collectionContractAddress === collectionContractAddress
          );

          if (matchingData) {
            const arrayMatchingData: any[] = matchingData.flatMap((data) => data.mintData);
            setData(arrayMatchingData);
            onItemsCountChange(arrayMatchingData.length);
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
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
      {data ? (
        <>
          {data.map((item, index) => {
            console.log(item);
            return (
              <Link href={`/admin/mintnft/${item?.tokenURI}`} key={index}>
                <div className="h-[170px] w-full sm:h-[270px] lg:h-[370px] 2xl:h-[400px]">
                  <CertificatePreview
                    previewImage={item.certData.templateURL}
                    name={item.fullname}
                    fontSize={item.fontSize}
                    fontFamily={item.fontFamily}
                  />
                </div>
              </Link>
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
