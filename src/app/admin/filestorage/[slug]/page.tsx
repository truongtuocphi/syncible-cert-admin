/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import { ref, get } from 'firebase/database';

import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import { db } from '@/lib/firebase';
import configDate from '@/utils/configDate';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL is not defined');
}

const FolderDetail = ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const decodedId = decodeURIComponent(id);

          const folderRef = ref(db, `folders/${decodedId}/data_define`);
          const snapshot = await get(folderRef);
          if (snapshot.exists()) {
            const dataObj = snapshot.val();
            const dataArray = Object.values(dataObj);
            setData(dataArray);
          } else {
            // eslint-disable-next-line no-console
            console.log('No data available');
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {data.map((item, index) => {
        const {
          templateIpfsHash,
          selectedTemplate,
          authorizingOrgName,
          headOrgName,
          headOrgPosition,
          signatureIpfsHash,
          certificateNumber,
          issueDate,
          description,
          fullName,
          headLogoIpfsHash,
        } = item;

        return (
          <div key={index} className="sticky h-fit w-full rounded-xl">
            <div className="h-[170px] sm:h-[270px] lg:h-[420px] 2xl:h-[500px]">
              <CertificatePreview
                headerURL={headerURL}
                description={description}
                previewImage={`${templateIpfsHash ? `${headerURL}/ipfs/${templateIpfsHash}` : ''}`}
                selectedTemplate={selectedTemplate ? selectedTemplate : 'templateIpfsHash'}
                previewHeadLogo={`${headerURL}/ipfs/${headLogoIpfsHash}`}
                certificateNumber={certificateNumber}
                authorizingOrgName={authorizingOrgName}
                headOrgPosition={headOrgPosition}
                headOrgName={headOrgName}
                previewSignature={`${headerURL}/ipfs/${signatureIpfsHash}`}
                name={fullName}
                date={issueDate}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FolderDetail;
