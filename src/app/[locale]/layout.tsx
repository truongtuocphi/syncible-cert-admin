import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { inter } from '@/components/ui/fonts';

import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Favicon from './favicon.ico';

export const metadata: Metadata = {
  title: 'Syncible | Tokenized Academic Certificate on Blockchain',
  description: 'Syncible | Tokenized Academic Certificate on Blockchain',
  openGraph: {
    title: 'Syncible | Tokenized Academic Certificate on Blockchain',
    description:
      'The Syncible project helps you issue and validate highly secure digital certificates with blockchain.',
    url: 'https://www.syncible.io',
    siteName: 'Syncible',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.syncible.io',
  },
  icons: [{ url: Favicon.src, sizes: '10x26', type: 'image/x-icon', rel: 'icon' }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Great+Vibes&family=MonteCarlo&family=Montserrat:wght@600&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto:wght@400&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&family=Old+Standard+TT:wght@600&family=Playball:wght@400&family=Prata:wght@400&family=Updock:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <NextTopLoader showSpinner={false} color="#3FA2F6" />
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
