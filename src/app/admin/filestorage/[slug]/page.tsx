'use client';

import { useEffect, useState } from 'react';

import { ref, get } from 'firebase/database';

import { db } from '@/lib/firebase';

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
          const folderRef = ref(db, `folders/${id}/data_define`);
          const snapshot = await get(folderRef);
          if (snapshot.exists()) {
            setData(snapshot.val());
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (data.length === 0) return <p>No data available</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((item, index) => {
        const {
          templateIpfsHash,
          selectedTemplate,
          authorizingOrgName,
          headOrgName,
          headOrgPosition,
          previewSignature,
          certificateNumber,
          issueDate,
          description,
          fullName,
        } = item;

        return (
          <div key={index} className="sticky h-fit w-full rounded-xl bg-white p-4">
            <div className="relative h-[360px] w-full overflow-hidden">
              <img
                src={
                  templateIpfsHash
                    ? `${headerURL}/ipfs/${templateIpfsHash}`
                    : `${headerURL}/ipfs/${selectedTemplate}`
                }
                alt="Certificate Template"
                className="h-full w-full rounded-lg"
              />

              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                <div className="absolute top-[15%] text-center">
                  <h1 className="text-[2vw] font-bold">CHỨNG NHẬN</h1>
                  <p className="text-[0.7vw]">{`Số: ${certificateNumber || 'xxxxx-xxxxx'}`}</p>
                  <h1 className="text-[1.8vw] font-bold">{fullName || 'Full Name'}</h1>
                  <p className="mt-0 text-center text-[1vw]">
                    Đã hoàn thành khóa đào tạo ngắn hạn
                    <br />“{description}”
                  </p>
                  <span className="mt-2 text-[0.7vw]">{issueDate || 'xx-xx-xxxx'}</span>
                </div>

                <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
                  {authorizingOrgName && (
                    <>
                      {previewSignature && (
                        <img src={previewSignature} alt="Head Signature" className="w-[4vw]" />
                      )}
                      <div className="text-center">
                        <p className="text-[0.8vw]">{headOrgName || 'Head Name'}</p>
                        <p className="text-[0.8vw]">{`${headOrgPosition || 'Position'} tổ chức ${authorizingOrgName}`}</p>
                        <p className="text-[0.8vw]">{`Giấy chứng nhận số: ${certificateNumber || 'xxx-xxx'}`}</p>
                        <p className="text-[0.8vw]">{`của ${authorizingOrgName}, cấp ngày ${issueDate || 'xx-xx-xxxx'}`}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FolderDetail;
