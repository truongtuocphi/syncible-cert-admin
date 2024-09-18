import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div>{children}</div>;
};

export default LoginLayout;
