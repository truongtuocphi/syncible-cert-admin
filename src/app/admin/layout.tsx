import { ReactNode } from 'react';

import ClientSessionProvider from '@/components/layout/ClientSessionProvider';

interface AdminLayoutProps {
  children: ReactNode;
  session: any;
}

const AdminLayout = ({ children, session }: AdminLayoutProps) => {
  return <ClientSessionProvider session={session}>{children}</ClientSessionProvider>;
};

export default AdminLayout;
