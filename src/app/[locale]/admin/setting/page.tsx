'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaUser } from 'react-icons/fa';
import { LocaleSelect } from '@/components/common/switcher/LocaleSwitcher';
import IconPolygon from '@/components/icons/IconPolygon';
import CopyButton from '@/components/common/coppyText/CopyButton';
import { auth, db, ref, get } from '@/lib/firebase';
import convertToVietnamTime from '@/utils/convertToVietnamTime';
import Loading from '@/components/common/loading/Loading';

export default function Setting() {
  const { address, isConnected } = useAccount();

  const [image, setImage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const t = useTranslations('Dapp.setting');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userRef = ref(db, 'users/' + currentUser.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          })
          .finally(() => {
            setLoading(false); // Kết thúc trạng thái loading sau khi lấy dữ liệu
          });
      } else {
        setLoading(false); // Nếu không có người dùng, vẫn kết thúc trạng thái loading
      }
    });

    return () => unsubscribe(); // Hủy bỏ đăng ký listener khi component bị unmount
  }, []);

  // Show loading component if still loading
  if (loading) {
    return <Loading />;
  }

  // Show message if no user is logged in
  if (!user) {
    return <div>{t('titlenoUserLoggedIn')}</div>;
  }

  return (
    <>
      <div className="mb-4 text-2xl font-bold text-gray-800">{t('title')}</div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-4/12 grid-cols-2 rounded-3xl bg-gray-200 ">
          <TabsTrigger value="profile" className="rounded-2xl">
            {t('tabProfile')}
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-2xl">
            {t('tabAcc')}
          </TabsTrigger>
        </TabsList>
        {/* Edit profile */}
        <TabsContent value="profile">
          <Card className="rounded-2xl p-6">
            <CardContent className="space-y-2">{/* Nội dung hiển thị profile */}</CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <Card className="rounded-2xl p-6">
            <CardContent className="space-y-2">{/* Nội dung hiển thị tài khoản */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
