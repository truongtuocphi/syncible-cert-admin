import { ReactNode } from 'react';

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return <div>{children}</div>;
};

export default RegisterLayout;
