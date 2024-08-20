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
          <div className="relative w-full overflow-hidden md:w-9/12">
            <img
              src={`${headerURL}/ipfs/${templateURL}`}
              alt="Certificate Template"
              className="w-full rounded-lg"
            />

            <div className="absolute right-14 top-10">
              {headLogo && (
                <img
                  src={`${headerURL}/ipfs/${headLogo}`}
                  alt="Head Signature"
                  className="w-[4vw]"
                />
              )}
            </div>

            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              <div className="absolute top-[15%] text-center">
                <h1 className="text-[1.5vw] font-bold md:text-[3vw]">Certification</h1>
                <p className="text-[1.5vw] md:text-[1.5vw] lg:text-[1.2vw]">{`Number: ${certificateID}`}</p>
                <h1 className="text-[2vw] font-bold md:text-[2.5vw] 2xl:text-[4vw]">
                  {name.split('Certificate for')}
                </h1>
                <p className="mt-2 text-center text-[1.2vw] md:text-[1.5vw] lg:text-[1.8vw]">
                  Completed training course
                  <br />“{description}”
                </p>
                <span className="mt-2 text-[2.5vw] md:text-[1.5vw] lg:text-[1.2vw]">
                  {configDate(date)}
                </span>
              </div>
              <div className="absolute bottom-[10%] left-[15%] flex flex-col items-center">
                <img
                  src={`${headerURL}/ipfs/${headSignature}`}
                  alt="Head Signature"
                  className="w-[2vw] md:w-[3vw] lg:w-[7vw]"
                />
                <div className="text-center">
                  <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${headName}`}</p>
                  <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${headPosition}`}</p>
                  <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${organizationName}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full md:ml-4 md:mt-0 md:w-4/12">
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
