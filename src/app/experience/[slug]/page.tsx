'use client';

import { useEffect, useState } from 'react';

import { useAccount } from 'wagmi';

const headerURL = 'https://fuchsia-fancy-orangutan-869.mypinata.cloud';

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;
  const [data, setData] = useState(null);
  const { address } = useAccount();

  const [name, setName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [headName, setHeadName] = useState('');
  const [headPosition, setHeadPosition] = useState('');
  const [headSignature, setHeadSignature] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
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
        setDescription(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Description').value
        );
        setPosition(
          attributes.find((attr: { trait_type: string }) => attr.trait_type === 'Position').value
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
  }, [slugPost]);

  if (!data)
    return (
      <div className="w-full pt-16">
        <div className="min-h-[calc(100vh-10rem)] w-full px-6 py-12 md:px-14 lg:px-24 2xl:px-60">
          <h1 className="text-center text-5xl text-white">Loading...</h1>
        </div>
      </div>
    );

  return (
    <div className="w-full pt-16">
      <div className="min-h-[calc(100vh-10rem)] w-full px-6 py-12 md:px-14 lg:px-24 2xl:px-60">
        <div className="mx-auto max-w-full space-y-4 rounded-xl bg-white p-6 text-black shadow-md">
          <h2 className="text-2xl font-bold">Verify</h2>
          <div className="flex justify-between">
            <div className="flex w-1/2 flex-col items-center">
              <img
                src={`${headerURL}/ipfs/${templateURL}`}
                alt="Certificate Template"
                className="h-auto w-full"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-3xl font-bold text-black">{name}</h3>
              <p className="mt-2 text-lg">Tên chứng nhận: abc</p>
              <textarea
                className="mt-4 h-32 w-full rounded border border-gray-300 p-2"
                value={description}
                readOnly
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="flex w-1/2 flex-col items-start">
              <h4 className="text-xl font-bold">Full details</h4>
              <p className="mt-2">Production location: VietNam</p>
              <p className="mt-2">Dymension: 500x300</p>
              <p className="mt-2">{`Certificate ID: ${certificateID}`}</p>
            </div>
            <div className="flex w-1/2 flex-col items-start">
              <h4 className="text-xl font-bold">Chain Information</h4>
              <p className="mt-2">{`Blockchain: ${blockchainType}`}</p>
              <p className="mt-2">{`Token ID: ${slugPost}`}</p>
              <p className="mt-2">{`Contract address: 0x5Ae10131774eF0dc641eb608CB3ccA95DD96EcF8`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdExperience;
