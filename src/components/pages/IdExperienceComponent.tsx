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
import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { FaLinkedinIn } from 'react-icons/fa';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ButtonPrimary from '../common/button/ButtonPrimary';
import html2canvas from 'html2canvas';
import { useTranslations } from 'next-intl';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL || '';

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

const listSocialMedia = [
  {
    link_name: 'LinkedIn',
    url: '#',
    icon: <FaLinkedinIn className="text-2xl" />,
  },
  {
    link_name: 'Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=',
    icon: <FaFacebookF className="text-2xl" />,
  },
  {
    link_name: 'Twitter',
    url: 'https://twitter.com/intent/tweet?url=',
    icon: <FaXTwitter className="text-2xl" />,
  },
  {
    link_name: 'Email',
    url: 'mailto:?subject=Check%20this%20out&body=',
    icon: <MdEmail className="text-2xl" />,
  },
];

interface IdExperienceProps {
  slugPost: string;
  changeLayout?: boolean;
  onDataContract?: (dataContract: any) => void;
  onDataNameCertificate?: (name: any) => void;
}

const IdExperienceComponent: React.FC<IdExperienceProps> = ({
  slugPost,
  onDataContract,
  onDataNameCertificate,
  changeLayout = false,
}) => {
  const [data, setData] = useState<any>(null);
  const [dataContract, setDataContract] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [linkWeb, setLinkWeb] = useState<string>('');

  const [name, setName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [date, setDate] = useState('');
  const [blockchainType, setBlockchainType] = useState('Polygon');
  const [templateURL, setTemplateURL] = useState('');
  const [fontFamily, setFontFamily] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('');

  const t = useTranslations('IdExperienceComponent');
  const translationCollection = useTranslations('Dapp.collectionCertificate');

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
    const currentLink = window.location.href;
    setLinkWeb(currentLink);
  }, []);

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

    return initials;
  }

  const shareOnLinkedIn = (title: string, summary: string, url: string) => {
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
    window.open(linkedInUrl, '_blank');
  };

  function generateLinkedInCertificationLink(
    certName: string,
    organizationName: string,
    issueYear: string,
    issueMonth: string,
    certId: string,
    certUrl: string
  ): any {
    const baseUrl = 'https://www.linkedin.com/profile/add/?startTask=CERTIFICATION_NAME';
    const params = new URLSearchParams({
      name: certName,
      organizationName: organizationName,
      issueYear: issueYear,
      issueMonth: issueMonth,
      certId: certId,
      certUrl: certUrl,
    });

    window.open(`${baseUrl}&${params.toString()}`, '_blank');
  }

  // const downloadImageByClass = () => {
  //   const elements = document.querySelectorAll('.picture-cert');

  //   elements.forEach((element, index) => {
  //     const textElements = element.querySelectorAll('.textName');

  //     textElements.forEach((textElement) => {
  //       const htmlTextElement = textElement as HTMLElement;
  //       htmlTextElement.style.transform = 'translateY(-15px)';
  //     });

  //     html2canvas(element as HTMLElement, {
  //       useCORS: true,
  //       allowTaint: true,
  //       backgroundColor: null,
  //     }).then((canvas) => {
  //       const imageUrl = canvas.toDataURL('image/png');
  //       const link = document.createElement('a');
  //       link.href = imageUrl;
  //       link.download = `certificate_image_${index + 1}.png`;
  //       link.click();

  //       textElements.forEach((textElement) => {
  //         const htmlTextElement = textElement as HTMLElement;
  //         htmlTextElement.style.transform = '';
  //       });
  //     });
  //   });
  // };

  const downloadImageByClass = () => {
    const elements = document.querySelectorAll('.picture-cert');
    const targetWidth = 2000;
    const targetHeight = 1404;

    elements.forEach((element, index) => {
      const textElements = element.querySelectorAll('.textName');

      textElements.forEach((textElement) => {
        const htmlTextElement = textElement as HTMLElement;
        htmlTextElement.style.transform = 'translateY(-9px)';
      });

      html2canvas(element as HTMLElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      }).then((canvas) => {
        const scaledCanvas = document.createElement('canvas');
        scaledCanvas.width = targetWidth;
        scaledCanvas.height = targetHeight;
        const ctx = scaledCanvas.getContext('2d');

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetWidth, targetHeight);

          const imageUrl = scaledCanvas.toDataURL('image/jpeg', 1);
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = `certificate_image_${index + 1}.jpeg`;
          link.click();

          scaledCanvas.remove();
        }

        textElements.forEach((textElement) => {
          const htmlTextElement = textElement as HTMLElement;
          htmlTextElement.style.transform = '';
        });
      });
    });
  };

  if (!data) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <head>
        <title>Nền Tảng Chứng Chỉ NFT Syncible</title>
        <meta property="og:title" content={'Nền Tảng Chứng Chỉ NFT Syncible'} />
        <meta
          property="og:description"
          content={'website cung cấp Chứng Chỉ NFT được Syncible phát hành'}
        />
        <meta
          property="og:image"
          content={
            'https://gateway.pinata.cloud/ipfs/QmVQUxa7ERzgnpqhFzXo9SyUKGs3wEieDLBaqpgig7fP7J'
          }
        />
        <meta property="og:url" content={`${linkWeb}/${slugPost}`} />
      </head>
      <div className="mt-5 w-full px-0 sm:px-4">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="w-full sm:w-2/3">
            <CertificatePreview
              previewImage={templateURL}
              name={name?.split('Certificate for')[1]?.trim()}
              fontFamily={fontFamily}
            />
          </div>
        </div>

        <div className="my-12 flex w-full items-center justify-center text-black">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-lg text-white">
              {getInitialsFromCertificateName(name?.split('Certificate for')[1]?.trim())}
            </div>
            <p className="text-lg font-bold sm:text-[2rem]">
              {name?.split('Certificate for')[1]?.trim()}
            </p>
          </div>
        </div>

        {changeLayout ? (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="order-2 col-span-1 rounded-3xl border-[1px] border-[#F0F0F0] bg-white/50 p-6 backdrop-blur-2xl xl:order-none xl:col-span-8">
              <div className="flex w-full flex-col items-start">
                <h4 className="mb-4 text-lg font-bold  lg:text-2xl">{t('header')}</h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('location.title')}</p>
                    <p>{t('location.value')}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('dimensions')}</p>
                    <p>2000 × 1414 (px)</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('date')}</p>
                    <p>{`${date}`}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('expirationDate.title')}</p>
                    <p>{t('expirationDate.value')}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Blockchain</p>
                    <p>Polygon</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('certificate')}</p>
                    <div className="flex items-center gap-2">
                      <p>{`${certificateID}`}</p>
                      <CopyButton textToCopy={certificateID} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">{t('contract')}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {`${dataContract[0].slice(0, 6)}...${dataContract[0].slice(-11)}`}
                      <CopyButton textToCopy={dataContract[0]} />
                      <Link
                        href={`https://polygonscan.com/address/${dataContract[0]}`}
                        target="_blank"
                      >
                        <RiShareBoxLine className="text-black" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 col-span-1 space-y-4 xl:order-none xl:col-span-4">
              <div className="flex h-fit flex-col gap-8 rounded-3xl border-[1px] border-[#F0F0F0] bg-white/50 p-6 backdrop-blur-2xl xl:col-span-4">
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold lg:text-2xl">
                    {translationCollection('titleDownLoad')}
                  </div>
                </div>
                <ButtonPrimary onClick={() => downloadImageByClass()}>
                  {' '}
                  {translationCollection('buttonDownLoad')}
                </ButtonPrimary>
              </div>
              <div className="flex h-fit flex-col gap-8 rounded-3xl border-[1px] border-[#F0F0F0] bg-white/50 p-6 backdrop-blur-2xl xl:col-span-4">
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold lg:text-2xl">{t('header_2')}</div>
                  <div className="text-[#A2A3A9]">{t('label')}</div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  {listSocialMedia.map((social, index) => (
                    <>
                      {index === 0 ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <div
                              className="flex flex-grow cursor-pointer justify-center rounded-xl p-3 shadow-combinedShadow2"
                              key={index}
                            >
                              {social.icon}
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[576px] ">
                            <div>
                              <div className="text-center">
                                <h1 className="text-4xl font-bold">
                                  {translationCollection('titleShare')}
                                </h1>
                                <p className="mt-3 text-base text-gray-500">
                                  {translationCollection('subtitle_1')}{' '}
                                  <span className="font-bold text-black">LinkedIn</span> 
                                  {translationCollection('subtitle_2')}
                                </p>
                              </div>

                              <ButtonPrimary
                                onClick={() =>
                                  generateLinkedInCertificationLink(
                                    'Certificate',
                                    'Syncible',
                                    date,
                                    date,
                                    certificateID,
                                    linkWeb
                                  )
                                }
                                className="mt-10 w-full rounded-full shadow-combinedShadow1"
                              >
                                {translationCollection('ButtonShareMyProfile')}
                              </ButtonPrimary>

                              <nav className="list mt-10">
                                <ul className="list-inside list-disc text-gray-400">
                                  <li className="mt-2">
                                    {translationCollection('titleContent')}{' '}
                                    <span className="font-bold text-black">
                                      {translationCollection('subContent_1')}{' '}
                                    </span>
                                  </li>
                                  <li className="mt-2 ">{translationCollection('subContent_2')}</li>
                                </ul>
                              </nav>

                              <ButtonPrimary
                                className="mt-10 w-full rounded-full shadow-combinedShadow1"
                                onClick={() =>
                                  shareOnLinkedIn(
                                    'Chứng chỉ blockchain',
                                    'Chứng chỉ về blockchain được cấp bởi tổ chức Syncible',
                                    linkWeb
                                  )
                                }
                              >
                                {translationCollection('ButtonShare')}
                              </ButtonPrimary>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Link
                          href={`${social.url}${linkWeb}`}
                          className="flex flex-grow justify-center rounded-xl p-3 shadow-combinedShadow2"
                          target={'_blank'}
                        >
                          <div className="" key={index}>
                            {social.icon}
                          </div>
                        </Link>
                      )}
                    </>
                  ))}
                </div>
                <div className="flex items-center overflow-hidden rounded-xl border border-[#A2A3A9] bg-white">
                  <input
                    type="text"
                    value={linkWeb}
                    className="grow text-ellipsis border-r border-[#A2A3A9] p-3"
                    disabled
                  />
                  <div className="p-3 text-center">
                    <CopyButton textToCopy={linkWeb} />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-span-1 flex h-fit flex-col gap-8 rounded-3xl border-[1px] border-[#F0F0F0] bg-white/50 p-6 backdrop-blur-2xl xl:col-span-4">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-bold lg:text-2xl">{t('header_2')}</div>
                <div className="text-[#A2A3A9]">{t('label')}</div>
              </div>
              <div className="flex items-center justify-between gap-4">
                {listSocialMedia.map((social, index) => (
                  <>
                    {index === 0 ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className="flex flex-grow cursor-pointer justify-center rounded-xl p-3 shadow-combinedShadow2"
                            key={index}
                          >
                            {social.icon}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[576px] ">
                          <div>
                            <div className="text-center">
                              <h1 className="text-4xl font-bold">
                                {translationCollection('titleShare')}
                              </h1>
                              <p className="mt-3 text-base text-gray-500">
                                {translationCollection('subtitle_1')}{' '}
                                <span className="font-bold text-black">LinkedIn</span> 
                                {translationCollection('subtitle_2')}
                              </p>
                            </div>

                            <ButtonPrimary
                              onClick={() =>
                                generateLinkedInCertificationLink(
                                  'Certificate',
                                  'Syncible',
                                  date,
                                  date,
                                  certificateID,
                                  linkWeb
                                )
                              }
                              className="mt-10 w-full rounded-full shadow-combinedShadow1"
                            >
                              {translationCollection('ButtonShareMyProfile')}
                            </ButtonPrimary>

                            <nav className="list mt-10">
                              <ul className="list-inside list-disc text-gray-400">
                                <li className="mt-2">
                                  {translationCollection('titleContent')}{' '}
                                  <span className="font-bold text-black">
                                    {translationCollection('subContent_1')}{' '}
                                  </span>
                                </li>
                                <li className="mt-2 ">{translationCollection('subContent_2')}</li>
                              </ul>
                            </nav>

                            <ButtonPrimary
                              className="mt-10 w-full rounded-full shadow-combinedShadow1"
                              onClick={() =>
                                shareOnLinkedIn(
                                  'Chứng chỉ blockchain',
                                  'Chứng chỉ về blockchain được cấp bởi tổ chức Syncible',
                                  linkWeb
                                )
                              }
                            >
                              {translationCollection('ButtonShare')}
                            </ButtonPrimary>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Link
                        href={`${social.url}${linkWeb}`}
                        className="flex flex-grow justify-center rounded-xl p-3 shadow-combinedShadow2"
                        target={'_blank'}
                      >
                        <div className="" key={index}>
                          {social.icon}
                        </div>
                      </Link>
                    )}
                  </>
                ))}
              </div>
              <div className="flex items-center overflow-hidden rounded-xl border border-[#A2A3A9] bg-white">
                <input
                  type="text"
                  value={linkWeb}
                  className="grow text-ellipsis border-r border-[#A2A3A9] p-3"
                  disabled
                />
                <div className="p-3 text-center">
                  <CopyButton textToCopy={linkWeb} />
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="mt-6 flex flex-col justify-between gap-8 rounded-3xl bg-white p-6 md:flex-row">
            <div className="items-star flex w-full flex-col md:w-1/2">
              <h4 className="text-xl font-bold">{translationCollection('titleFullDetail')}</h4>
              <div className="my-3 w-full border-[0.5px] border-gray-100"></div>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('productionLocation')}</p>
                  <p>Việt Nam</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('Dymension')}</p>
                  <p>2000 × 1414 (px)</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('issueDate')}</p>
                  <p>{`${date}`}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('expiryDate')}</p>
                  <p>{translationCollection('valueExpiryDate')}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start md:w-1/2">
              <h4 className="text-xl font-bold">{translationCollection('titleBlockChain')}</h4>
              <div className="my-3 w-full border-[0.5px] border-gray-100"></div>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Blockchain</p>
                  <p>Polygon</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('certificateID')}</p>
                  <div className="flex items-center gap-2">
                    <p>{`${certificateID}`}</p>
                    <CopyButton textToCopy={certificateID} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{translationCollection('contractAddress')}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {`${dataContract}`}
                    <CopyButton textToCopy={dataContract[0]} />
                    <Link
                      href={`https://polygonscan.com/address/${dataContract[0]}`}
                      target="_blank"
                    >
                      <RiShareBoxLine className="text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IdExperienceComponent;
