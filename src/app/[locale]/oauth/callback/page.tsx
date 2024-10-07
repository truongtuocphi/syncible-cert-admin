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
  browserSessionPersistence,
  onAuthStateChanged,
  get,
} from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import Loading from '@/components/common/loading/Loading';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [responseData, setResponse] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});
  const [success, setSuccess] = useState('');

  // Hàm lấy Access Token
  const handleGetAccessToken = async () => {
    try {
      const storedState = localStorage.getItem('state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter');
        router.push('/login')
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
      const data = await res.json();
      setResponse(data);
      setAccessToken(data?.data?.access_token || '');
    } catch (error) {
      alert(error);
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
      setUserInfo(userInfoData);

      // Kiểm tra xem user đã tồn tại trong Realtime Database chưa
      await checkAndRegisterUser(userInfoData);
    } catch (error) {
      alert('Failed to fetch user info');
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
      const password = 'defaultPassword'; // Mật khẩu mặc định hoặc có thể tạo mật khẩu khác

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const newUser = auth.currentUser; // Lấy người dùng sau khi đăng ký

        if (newUser) {
          const newUserRef = ref(db, 'users/' + newUser.uid); // Tạo `ref` với `uid` của người dùng mới
          await set(newUserRef, {
            uid: newUser.uid, // Lưu `uid` của Firebase user
            idBasal: userInfoData?.data?.id, // Có thể lưu thêm thông tin từ Basal
            name: userInfoData?.data?.name || '',
            email,
            avatar: '',
            createdAt: new Date().toISOString(),
          });
          setSuccess('Registration successful! Redirecting to login...');
          setTimeout(() => {
            router.push('/admin');
          }, 2000);
        }
      } catch (err) {
        const firebaseError = err as FirebaseError;

        if (firebaseError.code === 'auth/email-already-in-use') {
          // Nếu email đã tồn tại, thực hiện đăng nhập
          try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful!');
            await router.push('/admin');
          } catch (loginError) {
            await router.push('/login');
            console.error('Login error:', loginError);
          }
        } else {
          // Các lỗi khác ngoài "email đã tồn tại"
          setFormErrors({
            email: 'Registration failed.',
          });
        }
      }
    } else {
      // Nếu người dùng đã tồn tại thì thực hiện đăng nhập
      const email = userInfoData?.data?.email;
      const password = 'defaultPassword'; // Mật khẩu mặc định hoặc mật khẩu của user

      try {
        await signInWithEmailAndPassword(auth, email, password);
        await router.push('/admin');
      } catch (error) {
        await router.push('/login');
        console.error('Login error:', error);
      }
    }
  };

  useEffect(() => {
    setCodeVerifier(localStorage.getItem('codeVerifier') || '');

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
