import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <ClientSessionProvider>
      <div>{children}</div>
    </ClientSessionProvider>
  );
};

export default LoginLayout;
