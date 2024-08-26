/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CertificatePreview: React.FC<any> = ({
  previewImage,
  selectedTemplate,
  headerURL,
  previewHeadLogo,
  description,
  authorizingOrgName,
  previewSignature,
  headOrgName,
  headOrgPosition,
  certificateNumber,
  date,
  name,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border-[0.5px]">
      {previewImage || selectedTemplate ? (
        <>
          <img
            src={previewImage ? previewImage : `${headerURL}/ipfs/${selectedTemplate}`}
            alt="Certificate Template"
            className="h-full w-full rounded-lg"
          />

          <div className="absolute right-14 top-10">
            {previewHeadLogo != undefined &&
            previewHeadLogo != null &&
            previewHeadLogo != `${headerURL}/ipfs/undefined` &&
            previewHeadLogo != `${headerURL}/ipfs/Student` &&
            previewHeadLogo != `${headerURL}/ipfs/Teacher` ? (
              <img src={`${previewHeadLogo}`} alt="Head Signature" className="w-14" />
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex h-[170px] w-full items-center justify-center rounded-lg bg-gray-100 sm:h-[270px] lg:h-[420px] 2xl:h-[500px]">
          <p className="text-sm font-semibold text-gray-600">Preview of your Template</p>
        </div>
      )}

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ fontFamily: '"Radley", serif' }}
      >
        {previewImage || selectedTemplate ? (
          <div className="absolute top-[1%] flex h-[80%] w-[80%] flex-col justify-around text-center">
            <div>
              <span className="text-xs">
                {certificateNumber ? `Number ID: ${certificateNumber}` : `Number ID: xx-xx-xxxx`}
              </span>
              <div style={{ fontFamily: '"Libre Baskerville", serif' }} className="mt-4">
                <h1 className="gap flex flex-col font-bold">
                  <span className="text-4xl">CERTIFICATE</span>
                  <span className="text-xl">OF APPRECIATION</span>
                </h1>
                <p className="mt-4 text-xs">PROUDLY PRESENTED TO</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-11">
              <h1
                className="text-4xl font-bold"
                style={{ fontFamily: '"Libre Baskerville", serif' }}
              >{`${name || 'Full Name'}`}</h1>

              <div
                className="mb-1 mt-2 flex w-full justify-center"
                style={{ fontFamily: 'Garamond, serif' }}
              >
                <p className="flex w-full max-w-[80%] items-center justify-center text-wrap break-words text-center text-sm">
                  <div>
                    <div>For participating in</div> <span className="font-bold">{description}</span>
                  </div>
                </p>
              </div>

              {date ? (
                <span className="text-base">{date === 'Invalid Date' ? 'xx-xx-xxxx' : date}</span>
              ) : (
                <span className="text-base">xx-xx-xxxx</span>
              )}
            </div>

            <div className="flex h-24 w-20 flex-col items-start text-center">
              <div className="flex flex-col items-center">
                {authorizingOrgName && (
                  <>
                    {previewSignature && (
                      <img src={`${previewSignature}`} alt="Head Signature" className="h-14 w-20" />
                    )}
                    <div className="text-center">
                      <p className="text-xs">{headOrgName}</p>
                      <p className="text-xs">{`${headOrgPosition}`}</p>
                      <p className="text-xs">{`${authorizingOrgName}`}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CertificatePreview;
