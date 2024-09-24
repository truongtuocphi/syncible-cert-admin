/* eslint-disable no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { RiShareBoxLine } from 'react-icons/ri';

import CopyButton from '@/components/common/coppyText/CopyButton';
import Loading from '@/components/common/loading/Loading';
import { db, ref, get } from '@/lib/firebase';
import replaceData from '@/utils/replaceData';

import CertificatePreview from './admin/CertificatePreview';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL || '';

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

interface IdExperienceProps {
  slugPost: string;
  onDataContract?: (dataContract: any) => void;
  onDataNameCertificate?: (name: any) => void;
}

const IdExperienceComponent: React.FC<IdExperienceProps> = ({
  slugPost,
  onDataContract,
  onDataNameCertificate,
}) => {
  const [data, setData] = useState<any>(null);
  const [dataContract, setDataContract] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [date, setDate] = useState('');
  const [blockchainType, setBlockchainType] = useState('Polygon');
  const [templateURL, setTemplateURL] = useState('');
  const [fontFamily, setFontFamily] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${headerURL}/ipfs/${slugPost}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        setData(result);
        setName(result.fullname);
        onDataNameCertificate && onDataNameCertificate(result.fullname);

        const attributes = result.attributes;

        const getCertificateID = attributes.find(
          (attr: { trait_type: string }) => attr.trait_type == 'Certificate ID'
        ).value;

        const getDate = attributes.find(
          (attr: { trait_type: string }) => attr.trait_type == 'Date'
        ).value;

        const fontAtribute = attributes.find(
          (attr: { trait_type: string }) => attr.trait_type == 'Font'
        ).value;

        const fontSize = attributes.find(
          (attr: { trait_type: string }) => attr.trait_type == 'Font Size'
        ).value;

        fontAtribute && setFontFamily(fontAtribute);
        fontSize && setFontSize(fontSize);

        setCertificateID(replaceData(getCertificateID, getDate));

        setTemplateURL(
          attributes.find((attr: { trait_type: string }) => attr.trait_type == 'Template URL').value
        );
        setDate(attributes.find((attr: { trait_type: string }) => attr.trait_type == 'Date').value);
        setBlockchainType(
          attributes.find((attr: { trait_type: string }) => attr.trait_type == 'Blockchain Type')
            .value
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [slugPost]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'mintData');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const dataFromFirebase = snapshot.val();
          const matchingData = Object.values(dataFromFirebase)
            .filter((item: any) => item.mintData.some((child: any) => child[3] === slugPost))
            .map((item: any) => item.collectionContractAddress);

          if (matchingData) {
            setDataContract(matchingData);
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

    if (slugPost) {
      fetchData();
    }
  }, [slugPost]);

  useEffect(() => {
    if (dataContract.length > 0 && onDataContract) {
      onDataContract(dataContract[0]);
    }
  }, [dataContract, onDataContract]);

  function getInitialsFromCertificateName(certificateName: string): string {
    if (!certificateName) {
      return '';
    }

    const nameParts = certificateName.trim().split(' ');

    let initials: string;

    if (nameParts.length >= 4) {
      initials = nameParts
        .slice(-2)
        .map((word) => word[0])
        .join('');
    } else {
      initials = nameParts
        .slice(1)
        .map((word) => word[0])
        .join('');
    }

    console.log('initials', initials);

    return initials;
  }

  if (!data) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto mt-5 max-w-full">
      <div className="flex flex-col justify-center md:flex-row">
        <div className="h-[170px] w-3/5 sm:h-[270px] lg:h-[420px] 2xl:h-[550px]">
          <CertificatePreview
            previewImage={templateURL}
            name={name?.split('Certificate for')[1]?.trim()}
            fontFamily={fontFamily}
            fontSize={fontSize}
          />
        </div>
      </div>

      <div className="my-12 flex w-full items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-lg text-white">
            {getInitialsFromCertificateName(name?.split('Certificate for')[1]?.trim())}
          </div>
          <p className="text-2xl font-bold">{name?.split('Certificate for')[1]?.trim()}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-between gap-8 rounded-3xl bg-white p-6 md:flex-row">
        <div className="items-star flex w-full flex-col md:w-1/2">
          <h4 className="text-xl font-bold">Chi tiết thông tin chứng chỉ</h4>
          <div className="my-3 w-full border-[0.5px] border-gray-100"></div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Vị trí phát hành</p>
              <p>Việt Nam</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Kích thước chứng chỉ</p>
              <p> 500x300</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Ngày phát hành</p>
              <p>{`${date}`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Ngày hết hạn</p>
              <p>Vô thời hạn</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start md:w-1/2">
          <h4 className="text-xl font-bold">Thông tin Blockchain</h4>
          <div className="my-3 w-full border-[0.5px] border-gray-100"></div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold">Blockchain</p>
              <p>Polygon</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">ID chứng chỉ</p>
              <p>{`${certificateID}`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Địa chỉ hợp đồng</p>
              <div className="mt-2 flex items-center gap-2">
                {`${dataContract}`}
                <CopyButton textToCopy={dataContract[0]} />
                <Link href={`https://polygonscan.com/address/${dataContract[0]}`} target="_blank">
                  <RiShareBoxLine className="text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdExperienceComponent;
