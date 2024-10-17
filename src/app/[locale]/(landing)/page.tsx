'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import SectionAbout from '@/components/pages/Home/SectionAbout';
import SectionOurVision from '@/components/pages/Home/SectionOurVision';
import SectionWhatWeBelieve from '@/components/pages/Home/SectionWhatWeBelieve';
import SectionFAQ from '@/components/pages/Home/SectionFAQ';
import SectionBlogs from '@/components/pages/Home/SectionBlogs';

import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';

import BannerCertificate from '../../../../public/cert_example.png';
import EthereumLogoSVG from '../../../../public/ethereum-logo.svg';
import PolygonLogoSVG from '../../../../public/polygon-logo.svg';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';

import { useForm, ValidationError } from '@formspree/react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import '../../../style/phoneInput.css';
import imageSuccessfully from '../../../../public/successfully.png';

const Page = () => {
  const [phone, setPhone] = useState('');
  const [state, handleSubmit] = useForm('mkgnnqbd');

  const t = useTranslations('HomePage.title_section');
  const transContact = useTranslations('HomePage.contact');

  const handleChange = (value: string) => {
    setPhone(value);
  };

  return (
    <>
      <div
        className={`${montserrat.className} relative z-20 flex flex-col items-center gap-10 overflow-hidden`}
      >
        <div className="w-full max-w-[90rem]">
          {/* <div className="w-full"> */}
          <div className="flex flex-col justify-center px-4 pb-4 sm:min-h-dvh md:px-8 md:pb-10 xl:px-32">
            <div className="mt-24 flex h-full w-full flex-col justify-center md:mt-[8.25rem] lg:flex-row">
              <div className="flex items-center justify-center lg:basis-1/2 lg:pr-6">
                <div className="flex min-h-[20rem] animate-swipe-up-fadein flex-col items-center justify-center gap-6 antialiased sm:gap-8 lg:h-[30rem] lg:items-start">
                  <div
                    className={`text-md col-span-1 w-full text-wrap text-left text-[2.5rem] font-bold leading-none sm:text-center lg:text-left lg:text-5xl lg:leading-[4rem]`}
                  >
                    {t('label_1')}
                  </div>
                  <div className="w-full text-left text-[#6C6D71] sm:w-[70%] sm:text-center sm:text-lg md:text-base lg:w-full lg:text-left">
                    {t('label_2')}
                  </div>
                  <div className="w-full self-center sm:w-auto lg:self-start">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className={`
                          relative z-0 flex w-full items-center gap-2 overflow-hidden rounded-[1.25rem] bg-primary-50
                          px-10 py-7 text-base font-semibold
                          uppercase transition-all duration-500
        
                          before:absolute before:inset-0
                          before:-z-10 before:translate-x-[150%]
                          before:translate-y-[150%] before:scale-[2.5]
                          before:rounded-[100%] before:bg-primary-40
                          before:transition-transform before:duration-1000
                          before:content-[""]

                          hover:scale-105
                          hover:before:translate-x-[0%]
                          hover:before:translate-y-[0%]
                          active:scale-95`}
                        >
                          <span>{t('contact_button.label')}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="scrollable-content h-full w-screen overflow-y-auto !rounded-none pb-0 md:!rounded-3xl lg:h-[95%] lg:max-w-[576px]">
                        <DialogHeader className="mt-16">
                          <DialogTitle className="text-center text-4xl">
                            {transContact('title')}
                          </DialogTitle>
                          <DialogDescription className="text-center text-lg">
                            {transContact('subtitle')}
                          </DialogDescription>
                        </DialogHeader>
                        {!state.succeeded ? (
                          <form onSubmit={handleSubmit} className="h-fit space-y-5">
                            <div className="space-y-2">
                              <label className="font-bold text-gray-900">
                                {transContact('titleInputFullName')}
                              </label>
                              <input
                                id="full-name"
                                name="fullname"
                                type="text"
                                className="block w-full rounded-3xl border-[1px] border-gray-400 p-4"
                                placeholder={transContact('placeInputFullname')}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-bold text-gray-900">
                                {transContact('titleInputEmail')}
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                className="block w-full rounded-3xl border-[1px] border-gray-400 p-4"
                                placeholder={transContact('placeInputEmail')}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-bold text-gray-900">
                                {transContact('titleInputPhone')}
                              </label>
                              <PhoneInput
                                country={'vn'}
                                value={phone}
                                onChange={handleChange}
                                specialLabel=""
                                inputStyle={{
                                  border: '1px solid #A2A3A9',
                                  borderRadius: '20px',
                                  width: '100%',
                                  padding: '16px 16px 16px 55px',
                                }}
                                enableSearch={true}
                                searchPlaceholder="Search country..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-bold text-gray-900">
                                {transContact('titleInputCompany')}
                              </label>
                              <input
                                id="company"
                                name="company"
                                type="text"
                                className="block w-full rounded-3xl border-[1px] border-gray-400 p-4"
                                placeholder={transContact('placeInputCompany')}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="font-bold text-gray-900">
                                {transContact('titleInputMess')}
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="block w-full rounded-3xl border-[1px] border-gray-400 p-4"
                                placeholder={transContact('placeInputMess')}
                                required
                              />
                            </div>
                            <ButtonPrimary
                              type="submit"
                              disabled={state.submitting}
                              className="w-full"
                            >
                              Submit
                            </ButtonPrimary>
                            <div className="text-red">
                              <ValidationError errors={state.errors} />
                            </div>
                          </form>
                        ) : (
                          <DialogContent className="!rounded-3xl sm:max-w-[576px]">
                            <DialogHeader className="mt-16">
                              <DialogTitle className="text-center text-4xl">Contact us</DialogTitle>
                              <DialogDescription className="text-center text-lg">
                                Congratulations, you have submitted successfully.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-10 flex w-full items-center justify-center">
                              <Image
                                src={imageSuccessfully}
                                alt="image succesfully"
                                className="h-[80%] w-[60%]"
                              />
                            </div>
                          </DialogContent>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="relative h-fit w-full animate-swipe-up-fadein self-center lg:basis-1/2">
                <div className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 scale-50 sm:scale-90 md:block md:scale-75 lg:scale-110">
                  <Image
                    src={BannerCertificate}
                    alt="Certificate"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="block md:invisible">
                  <Image
                    src={BannerCertificate}
                    alt="Certificate placeholder"
                    className="min-h-[30rem] w-full object-contain md:min-h-full"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:py-10">
              <div className="text-md font-bold">{t('label_3')}</div>
              <div className="flex gap-14">
                <div className="h-9 w-[7rem]">
                  <EthereumLogoSVG className="h-full w-full" />
                </div>
                <div className="h-9 w-[7rem]">
                  <PolygonLogoSVG className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex max-w-[90rem] flex-col items-center gap-8 sm:gap-40">
          {/* <div className="relative z-20 flex flex-col items-center gap-8 sm:gap-40"> */}
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
          <SectionFAQ />
        </div>
        <SectionBlogs />
      </div>
    </>
  );
};

export default Page;
