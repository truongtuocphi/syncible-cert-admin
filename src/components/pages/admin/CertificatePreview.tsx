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
    <div className="relative h-[450px] w-full overflow-hidden 2xl:h-[700px]">
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
              <img src={`${previewHeadLogo}`} alt="Head Signature" className="w-[4vw]" />
            ) : null}
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
          <p className="text-sm font-semibold text-gray-600">Preview of your Template</p>
        </div>
      )}

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ fontFamily: 'Times New Roman, serif' }}
      >
        {previewImage || selectedTemplate ? (
          <div className="absolute top-[10%] text-center">
            <span className="text-[0.8vw]">
              {certificateNumber ? `Number ID: ${certificateNumber}` : `Number ID: xx-xx-xxxx`}
            </span>
            <h1 className="gap flex flex-col text-[2vw] font-bold">
              <span>CERTIFICATE</span>
              <span className="text-[1vw]">OF APPRECIATION</span>
            </h1>
            <p className="mt-4 text-[0.8vw]">PROUDLY PRESENTED TO</p>
            <h1
              className="text-[3vw] font-bold"
              style={{ fontFamily: 'Brush Script MT, serif' }}
            >{`${name || 'Full Name'}`}</h1>

            <div className="flex w-full justify-center" style={{ fontFamily: 'Garamond, serif' }}>
              <p className="mt-0 flex w-full max-w-[80%] justify-center text-wrap break-words text-center text-[1.2vw] font-bold">
                {`For participating in ${description}`}
              </p>
            </div>

            {date ? (
              <span className="mt-2 text-[0.8vw]">{date}</span>
            ) : (
              <span className="mt-2 text-[0.8vw]">xx-xx-xxxx</span>
            )}
          </div>
        ) : null}

        <div className="absolute bottom-[10%] left-[14%] flex flex-col items-center">
          {authorizingOrgName && (
            <>
              {previewSignature && (
                <img src={`${previewSignature}`} alt="Head Signature" className="w-[4vw]" />
              )}
              <div className="text-center">
                <p className="text-[0.8vw]">{headOrgName}</p>
                <p className="text-[0.8vw]">{`${headOrgPosition}`}</p>
                <p className="text-[0.8vw]">{`${authorizingOrgName}`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
