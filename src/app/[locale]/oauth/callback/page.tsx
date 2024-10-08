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
  signInWithPopup,
  provider,
  get,
} from '@/lib/firebase';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import Loading from '@/components/common/loading/Loading';

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

  // Hàm lấy thông tin người dùng bằng Access Token
  const handleGetUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfoData = await res.json();

      // Kiểm tra xem user đã tồn tại trong Realtime Database chưa
      await checkAndRegisterUser(userInfoData);
    } catch (error) {
      alert('Failed to fetch user info');
      router.push('/login');
    }
  };

  // Hàm kiểm tra và đăng ký người dùng
  const checkAndRegisterUser = async (userInfoData: any) => {
    const user = auth.currentUser; // Lấy người dùng hiện tại từ Firebase
    const userRef = ref(db, 'users/' + user?.uid); // Sử dụng `uid` của người dùng Firebase

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
            name: userInfoData?.data?.name || '',
            email,
            avatar: '',
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
    // Lấy Access Token
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
