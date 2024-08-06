'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const ClientSessionProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
