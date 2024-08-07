import { ReactNode } from 'react';

// import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return <div>{children}</div>;
};

export default RegisterLayout;
