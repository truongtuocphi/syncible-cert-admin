'use client';

import { useEffect, useState } from 'react';

import configDate from '@/utils/configDate';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;
const AddressConrtact = process.env.NEXT_PUBLIC_CERTIFICATE_NFT_CONTRACT;

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

if (!AddressConrtact) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_CERTIFICATE_NFT_CONTRACT không được định nghĩa');
}

const IdExperience = ({ params }: { params: { slug: string } }) => {
  const slugPost = params.slug;
  const [data, setData] = useState(null);

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
        // eslint-disable-next-line no-console
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [slugPost]);

  if (!data) return <h1 className="text-center text-5xl text-black">Loading...</h1>;

  return (
    <div className="mx-auto mt-5 max-w-full space-y-4 rounded-xl bg-white text-black">
      <h1 className="mb-4 text-sm text-gray-500">
        NFT Diploma {'>'} Define Template {'>'} Create NFT {'>'} Verify
      </h1>
      <h2 className="text-2xl font-bold">Verify</h2>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="relative w-full overflow-hidden md:w-9/12">
          <img
            src={`${headerURL}/ipfs/${templateURL}`}
            alt="Certificate Template"
            className="w-full"
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            <div className="absolute top-[15%] text-center">
              <h1 className="text-[1.5vw] font-bold md:text-[3vw]">CHỨNG NHẬN</h1>
              <p className="text-[1.5vw] md:text-[1.5vw] lg:text-[1.2vw]">{`Số: ${certificateID}`}</p>
              <h1 className="text-[2vw] font-bold md:text-[2.5vw] 2xl:text-[4vw]">
                {name.split('Certificate for')}
              </h1>
              <p className="mt-2 text-center text-[1.2vw] md:text-[1.5vw] lg:text-[1.5vw]">
                Đã hoàn thành khóa đào tạo ngắn hạn
                <br />
                “ỨNG DỤNG AI TRONG QUẢN LÝ HÀNH CHÍNH”
              </p>
              <span className="mt-2 text-[2.5vw] md:text-[1.5vw] lg:text-[1.2vw]">
                {configDate(date)}
              </span>
            </div>
            <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
              <img
                src={`${headerURL}/ipfs/${headSignature}`}
                alt="Head Signature"
                className="w-[4vw] md:w-[5vw] lg:w-[7vw]"
              />
              <div className="text-center">
                <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${headName}`}</p>
                <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`${headPosition} tổ chức ${organizationName}`}</p>
                <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`Giấy chứng nhận số: ${certificateID}`}</p>
                <p className="text-[1vw] md:text-[1vw] lg:text-[0.8vw]">{`của ${organizationName}, cấp ngày ${date}`}</p>
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
          <p className="mt-2">{`Token ID: ${slugPost}`}</p>
          <p className="mt-2">{`Contract address: ${AddressConrtact}`}</p>
        </div>
      </div>
    </div>
  );
};

export default IdExperience;
