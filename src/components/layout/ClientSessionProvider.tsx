'use client';

import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

interface ClientSessionProviderProps {
  children: ReactNode;
}

const ClientSessionProvider = ({ children }: ClientSessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
