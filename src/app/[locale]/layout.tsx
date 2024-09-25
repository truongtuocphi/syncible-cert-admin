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

export const metadata: Metadata = {
  title: 'Syncible | Tokenized Academic Certificate on Blockchain',
  description: 'Syncible | Tokenized Academic Certificate on Blockchain',
  icons: {
    icon: { url: 'src/app/icon.ico', sizes: '10x26', type: 'image/x-icon' },
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
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Great+Vibes&family=MonteCarlo&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-custom-blue-gradient min-h-screen`}>
        <NextTopLoader showSpinner={false} color="#3FA2F6" />
        {/* <img
          src="/Ellipse_25.png"
          alt="background"
          className="absolute left-0 top-0 -z-10 h-[1000px] w-full"
        /> */}
        <NextIntlClientProvider messages={messages}>
          <Web3ModalProvider initialState={initialState}>
            <main>{children}</main>
          </Web3ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
