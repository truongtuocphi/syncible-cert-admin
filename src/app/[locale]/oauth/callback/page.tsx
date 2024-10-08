'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  auth,
  db,
  set,
  ref,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  get,
} from '@/lib/firebase';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import Loading from '@/components/common/loading/Loading';
import { update } from 'firebase/database';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  const [accessToken, setAccessToken] = useState('');

  // Hàm lấy Access Token
  const handleGetAccessToken = async () => {
    try {
      const storedState = localStorage.getItem('state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter');
      }

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.NEXT_PUBLIC_URL_BASAL,
          code_verifier: localStorage.getItem('codeVerifier') || '',
          client_id: process.env.NEXT_PUBLIC_ID_BASAL,
        }),
      };

      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/token', options);
      const dataAPI = await res.json();
      setAccessToken(dataAPI?.data?.access_token || '');
    } catch (error) {
      alert(error);
      router.push('/login');
    }
  };

  const handleGetUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfoData = await res.json();

      const { avatar, first_name, last_name } = userInfoData.data;

      // Cập nhật dữ liệu người dùng trong Firebase
      updateUserDataInFirebase({
        avatar,
        first_name,
        last_name,
      });

      // Kiểm tra xem user đã tồn tại trong Realtime Database chưa
      await checkAndRegisterUser(userInfoData);
    } catch (error) {
      alert('Failed to fetch user info');
      router.push('/login');
    }
  };

  const updateUserDataInFirebase = async (userData: any) => {
    const user = auth.currentUser;
    const userRef = ref(db, 'users/' + user?.uid);

    if (user) {
      const dataToUpdate = {
        avatar: userData.avatar,
        first_name: userData.first_name,
        last_name: userData.last_name,
        updatedAt: new Date().toISOString(),
      };

      await update(userRef, dataToUpdate);
    }
  };

  // Hàm kiểm tra và đăng ký người dùng
  const checkAndRegisterUser = async (userInfoData: any) => {
    const user = auth.currentUser;
    const userRef = ref(db, 'users/' + user?.uid);

    // Kiểm tra xem người dùng đã tồn tại trong database chưa
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      // Nếu người dùng chưa tồn tại trong cơ sở dữ liệu, thực hiện đăng ký
      const email = userInfoData?.data?.email;
      const password = 'defaultPassword';

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const newUser = auth.currentUser;

        if (newUser) {
          const newUserRef = ref(db, 'users/' + newUser.uid);
          await set(newUserRef, {
            uid: newUser.uid,
            idBasal: userInfoData?.data?.id,
            last_name: userInfoData?.data?.last_name || '',
            fist_name: userInfoData?.data?.first_name || '',
            name: userInfoData?.data?.first_name || '',
            email,
            avatar: userInfoData?.data?.avatar || '',
            createdAt: new Date().toISOString(),
          });
          setTimeout(() => {
            router.push('/admin');
          }, 2000);
        }
      } catch (err) {
        const firebaseError = err as FirebaseError;

        if (firebaseError.code === 'auth/email-already-in-use') {
          // Nếu email đã tồn tại, thực hiện đăng nhập
          try {
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful!');
            await router.push('/admin');
          } catch (loginError) {
            await router.push('/login');
            console.error('Login error:', loginError);
          }
        } else {
          router.push('/login');
        }
      }
    } else {
      const email = userInfoData?.data?.email;
      const password = 'defaultPassword';

      try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        await router.push('/admin');
      } catch (error) {
        router.push('/login');
        console.error('Login error:', error);
      }
    }
  };

  useEffect(() => {
    handleGetAccessToken();
  }, []);

  // Khi Access Token có giá trị, gọi hàm lấy thông tin user
  useEffect(() => {
    if (accessToken) {
      handleGetUserInfo(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white">
      <Loading />
    </div>
  );
};

export default Page;
