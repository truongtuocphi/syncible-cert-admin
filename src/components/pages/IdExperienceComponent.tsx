/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import CopyButton from '@/components/common/coppyText/CopyButton';
import Loading from '@/components/common/loading/Loading';
import { db, ref, get } from '@/lib/firebase';
import configDate from '@/utils/configDate';
import CertificatePreview from './admin/CertificatePreview';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL || '';

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

interface IdExperienceProps {
  slugPost: string;
}

const IdExperienceComponent: React.FC<IdExperienceProps> = ({ slugPost }) => {
  const [data, setData] = useState<any>(null);
  const [dataContract, setDataContract] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [headName, setHeadName] = useState('');
  const [headPosition, setHeadPosition] = useState('');
  const [headSignature, setHeadSignature] = useState('');
  const [headLogo, setHeadLogo] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [blockchainType, setBlockchainType] = useState('');
  const [templateURL, setTemplateURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${headerURL}/ipfs/${slugPost}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);

        setName(result.name);

        const attributes = result.attributes;
        setCertificateID(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Certificate ID')
            .value
        );
        setOrganizationName(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Organization Name')
            .value
        );
        setHeadName(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Head Name').value
        );
        setHeadPosition(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Head Position')
            .value
        );
        setHeadSignature(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Head Signature')
            .value
        );
        setHeadLogo(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Position').value
        );
        setDescription(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Description').value
        );
        setDate(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Date').value
        );
        setBlockchainType(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Blockchain Type')
            .value
        );
        setTemplateURL(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Template URL')
            .value
        );
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [slugPost, headerURL]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(db, 'mintData');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const dataFromFirebase = snapshot.val();
          const matchingData = Object.values(dataFromFirebase).filter(
            (item: any) => item.mintData[0].tokenURI === slugPost
          );

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

  const handleBack = () => {
    window.history.back();
  };

  if (!data) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  console.log(data);
  console.log(headLogo);

  return (
    <>
      <div className="flex items-center gap-2">
        <ButtonPrimary className="rounded-lg bg-blue-500" onClick={handleBack}>
          <FaArrowLeft className="text-xl text-white" />
        </ButtonPrimary>
        <h2 className="text-2xl font-bold text-gray-600">Verify</h2>
      </div>
      <div className="mx-auto mt-5 max-w-full space-y-4 rounded-xl bg-white p-4 text-black">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="w-3/5">
            <CertificatePreview
              headerURL={headerURL}
              description={description}
              previewImage={`${headerURL}/ipfs/${templateURL}`}
              previewHeadLogo={`${headerURL}/ipfs/${headLogo}`}
              certificateNumber={certificateID}
              authorizingOrgName={organizationName}
              headOrgPosition={headPosition}
              headOrgName={headName}
              previewSignature={`${headerURL}/ipfs/${headSignature}`}
              name={name.split('Certificate for')[1].trim()}
              date={configDate(date)}
            />
          </div>
          <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-[40%]">
            <h3 className="text-3xl font-bold text-black">{name}</h3>
            <p className="mt-2 text-lg">Tên chứng nhận: {description}</p>
            <textarea
              className="mt-4 h-32 w-full rounded border border-gray-300 p-2"
              value={description}
              readOnly
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between md:flex-row">
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h4 className="text-xl font-bold">Full details</h4>
            <p className="mt-2">Production location: VietNam</p>
            <p className="mt-2">Dymension: 500x300</p>
            <p className="mt-2">{`Certificate ID: ${certificateID}`}</p>
          </div>
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h4 className="text-xl font-bold">Chain Information</h4>
            <p className="mt-2">{`Blockchain: ${blockchainType}`}</p>
            <div className="mt-2 flex items-center gap-2">
              <p>
                {`Token ID: `}
                <span className="text-blue-500 underline">
                  {slugPost.slice(0, 4)}...{slugPost.slice(-6)}
                </span>
              </p>
              <CopyButton textToCopy={slugPost} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p>
                {`Contract address: `}
                <span className="text-blue-500 underline">
                  {dataContract[0].collectionContractAddress.slice(0, 4)}...
                  {dataContract[0].collectionContractAddress.slice(-6)}
                </span>
              </p>
              <CopyButton textToCopy={dataContract[0].collectionContractAddress} />
              <Link
                href={`https://polygonscan.com/address/${dataContract[0].collectionContractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiShareBoxLine className="text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdExperienceComponent;
