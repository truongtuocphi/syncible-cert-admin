/* eslint-disable @next/next/no-page-custom-font */
import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { cookieToInitialState } from 'wagmi';

import { inter } from '@/components/ui/fonts';
import { config } from '@/config';
import Web3ModalProvider from '@/context';

import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
export const metadata: Metadata = {
  title: 'Nền Tảng Chứng Chỉ NFT Syncible',
  description: 'Nền Tảng Chứng Chỉ NFT Syncible',
  icons: {
    icon: { url: '/src/app/icon.ico', sizes: '10x26', type: 'image/x-icon' },
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=MonteCarlo&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-brand-10`}>
        <NextTopLoader showSpinner={false} color="#3FA2F6" />
        <NextIntlClientProvider messages={messages}>
          <Web3ModalProvider initialState={initialState}>
            <main>
              <div className="relative min-h-screen overflow-hidden">
                <div className="fixed top-0 z-30 w-screen md:mt-6">
                  <Navbar />
                </div>
                {children}
                <div className="font-inter relative w-full text-black">
                  <Footer />
                </div>
              </div>
            </main>
          </Web3ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
