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
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <ClientSessionProvider>
      <Web3ModalProvider initialState={initialState}>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="ml-64 flex-1 p-6 pt-16">
            <Header />
            <div className="mx-auto mt-10 flex max-w-screen-xl justify-center text-black">
              {children}
            </div>
          </div>
        </div>
      </Web3ModalProvider>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
