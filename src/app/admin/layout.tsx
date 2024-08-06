import { ReactNode } from 'react';

import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';
import { config } from '@/config';
import Web3ModalProvider from '@/context';

// Define only children prop
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <Web3ModalProvider initialState={initialState}>
      <ClientSessionProvider>
        <div>{children}</div>
      </ClientSessionProvider>
    </Web3ModalProvider>
  );
};

export default AdminLayout;
