import { ReactNode } from 'react';

import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';
import Header from '@/components/pages/admin/Header';
import Sidebar from '@/components/pages/admin/Sidebar';
import { config } from '@/config';
import Web3ModalProvider from '@/context';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const cookie = headers().get('cookie') || '';
  const initialState = cookieToInitialState(config, cookie);

  return (
    <ClientSessionProvider>
      <Web3ModalProvider initialState={initialState}>
        <div className="flex bg-bgPageAdmin" style={{ minHeight: 'calc(100vh + 100px)' }}>
          <Sidebar />
          <div className="ml-80 w-full flex-1 p-6 pt-16 2xl:ml-96">
            <Header />
            <div className="mx-auto mt-10 flex max-w-screen-lg justify-center text-black 2xl:max-w-screen-3xl">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </Web3ModalProvider>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
