import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface LoginLayoutProps {
  children: ReactNode;
  session: any;
}

const LoginLayout = ({ children, session }: LoginLayoutProps) => {
  return (
    <ClientSessionProvider session={session}>
      <div>{children}</div>
    </ClientSessionProvider>
  );
};

export default LoginLayout;
