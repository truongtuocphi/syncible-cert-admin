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

  if (!data) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto mt-5 max-w-full space-y-4 rounded-xl bg-white p-4 text-black">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="h-[170px] w-3/5 sm:h-[270px] lg:h-[420px] 2xl:h-[500px]">
          <CertificatePreview
            previewImage={templateURL}
            name={name?.split('Certificate for')[1]?.trim()}
            fontFamily={fontFamily}
            fontSize={fontSize}
          />
        </div>
        <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-[40%]">
          <h3 className="text-3xl font-bold text-black">
            {name?.split('Certificate for')[1]?.trim()}
          </h3>
        </div>
      </div>
      <div className="mt-6 flex flex-col justify-between md:flex-row">
        <div className="flex w-full flex-col items-start md:w-1/2">
          <h4 className="text-xl font-bold">Full details</h4>
          <p className="mt-2">Production location: VietNam</p>
          <p className="mt-2">Dymension: 500x300</p>
          <p className="mt-2">{`Certificate ID: ${certificateID}`}</p>
          <p className="mt-2">{`Date: ${date}`}</p>
        </div>
        <div className="flex w-full flex-col items-start md:w-1/2">
          <h4 className="text-xl font-bold">Chain Information</h4>
          <p className="mt-2">{`Blockchain: ${blockchainType}`}</p>
          {/* <div className="mt-2 flex items-center gap-2">
            <p>
              {`Token ID: `}
              <span className="text-primary-50 underline">
                {slugPost.slice(0, 4)}...{slugPost.slice(-6)}
              </span>
            </p>
            <CopyButton textToCopy={slugPost} />
          </div> */}
          <div className="mt-2 flex items-center gap-2">
            <p>
              {`Contract address: `}
              <span className="text-primary-50 underline">
                {dataContract[0].slice(0, 4)}...
                {dataContract[0].slice(-6)}
              </span>
            </p>
            <CopyButton textToCopy={dataContract[0]} />
            <Link href={`https://polygonscan.com/address/${dataContract[0]}`} target="_blank">
              <RiShareBoxLine className="text-black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdExperienceComponent;
