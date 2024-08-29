/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { cookieToInitialState } from 'wagmi';

import { config } from '@/config';
import Web3ModalProvider from '@/context';

export const metadata: Metadata = {
  title: 'Nền Tảng Chứng Chỉ NFT Syncible',
  description: 'Nền Tảng Chứng Chỉ NFT Syncible',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Baskervville+SC&family=Dancing+Script:wght@400..700&family=Mingzat&family=MonteCarlo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`backgroundCustom min-h-screen w-full bg-cover bg-center`}>
        <NextTopLoader showSpinner={false} color="#3FA2F6" />
        <Web3ModalProvider initialState={initialState}>
          <main>{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
