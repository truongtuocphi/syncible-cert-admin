import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
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
        <div>{children}</div>
      </Web3ModalProvider>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
