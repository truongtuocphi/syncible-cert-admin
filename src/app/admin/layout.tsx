import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

// Define only children prop
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClientSessionProvider>
      <div>{children}</div>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
