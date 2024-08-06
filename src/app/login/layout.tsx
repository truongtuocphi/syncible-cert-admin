import { ReactNode } from 'react';

// import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div>{children}</div>;
};

export default LoginLayout;
