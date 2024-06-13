import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

// import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { config } from '@/config';
import Web3ModalProvider from '@/context';

export const metadata: Metadata = {
  title: 'ABAII NFT-Certificate Platform',
  description: 'ABAII NFT-Certificate Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          <main className="relative">
            <div className="fixed z-10 w-full bg-white/30 shadow backdrop-blur-sm">
              <Navbar />
            </div>

            {children}

            {/* <div className="absolute bottom-0 left-0 right-0 top-0 -z-10">
              <div className="relative h-full w-full blur-3xl">
                <div className="absolute left-[10%] top-20 flex aspect-square w-[40vw] max-w-96 items-center justify-center rounded-full bg-violet-500/30">
                  <div className="aspect-square w-1/2 rounded-full bg-slate-950"></div>
                </div>
                <div className="absolute right-[15%] top-96 flex aspect-square w-[30vw] max-w-80 items-center justify-center rounded-full bg-fuchsia-500/30">
                  <div className="aspect-square w-1/2 rounded-full bg-slate-950"></div>
                </div>
              </div>
            </div> */}
          </main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
