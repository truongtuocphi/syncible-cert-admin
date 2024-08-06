import { ReactNode, useEffect, useState } from 'react';
import ClientSessionProvider from '@/components/layout/ClientSessionProvider';
import Web3ModalProvider from '@/context';
import Sidebar from '@/components/pages/admin/Sidebar';
import Header from '@/components/pages/admin/Header';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config';
import { headers } from 'next/headers';

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
          <div className="flex-1 p-6">
            <Header />
            <div className="rounded-lg bg-white p-6 text-black shadow-md">
              <div>
                <h1 className="mb-4 text-sm text-gray-500">NFT Diploma {'>'} Define Template</h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      </Web3ModalProvider>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
