import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface AdminLayoutProps {
  children: ReactNode;
  session: any;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClientSessionProvider>
      <div>{children}</div>
    </ClientSessionProvider>
  );
};

export default AdminLayout;
