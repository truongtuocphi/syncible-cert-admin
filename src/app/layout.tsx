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
      <body className={`backgroundCustom min-h-screen w-full bg-cover bg-center`}>
        <NextTopLoader showSpinner={false} color="#3FA2F6" />
        <Web3ModalProvider initialState={initialState}>
          <main>{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
