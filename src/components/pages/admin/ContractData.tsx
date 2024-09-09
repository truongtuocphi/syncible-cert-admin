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
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {data ? (
        <>
          {data.map((item, index) => {
            console.log(item.mintData[0].tokenURI);
            return (
              <Link href={`/admin/mintnft/${item.mintData[0].tokenURI}`} key={index}>
                <div className="h-[170px] w-full sm:h-[270px] lg:h-[420px] 2xl:h-[500px]">
                  {/* <CertificatePreview
                    headerURL={headerURL}
                    description={item.mintData[0].certData.description}
                    previewImage={`${headerURL}/ipfs/${item.mintData[0].certData.templateURL}`}
                    previewHeadLogo={`${headerURL}/ipfs/${item.mintData[0].certData.organizationLogo}`}
                    certificateNumber={item.mintData[0].certificateId}
                    authorizingOrgName={item.mintData[0].certData.organizationName}
                    headOrgPosition={item.mintData[0].certData.headPosition}
                    headOrgName={item.mintData[0].certData.headName}
                    previewSignature={`${headerURL}/ipfs/${item.mintData[0].certData.headSignature}`}
                    name={item.mintData[0].fullName}
                    date={configDate(item.mintData[0].certData.date)}
                  /> */}
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
