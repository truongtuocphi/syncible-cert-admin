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
          redirect_uri: 'http://localhost:3000/oauth/callback',
          code_verifier: localStorage.getItem('codeVerifier') || '',
          client_id: '14437770757134244933',
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
        setFormErrors({
          email:
            firebaseError.code === 'auth/email-already-in-use'
              ? 'Email is already in use.'
              : 'Registration failed.',
        });
      }
    } else {
      // Nếu người dùng đã tồn tại thì thực hiện đăng nhập
      const email = userInfoData?.data?.email;
      const password = 'defaultPassword'; // Mật khẩu mặc định hoặc mật khẩu của user

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
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
    <div className="m-10 mx-auto w-2/3 space-y-4">
      <p className="break-all">Code Verifier: {codeVerifier}</p>
      <p className="break-all">Code Authorization: {code}</p>
      <p className="break-all">Access token: {accessToken}</p>
      <p className="break-all">Refresh token: {responseData?.data?.refresh_token || ''}</p>

      {/* Hiển thị thông tin user nếu có */}
      {userInfo && (
        <div className="pt-4">
          <p className="font-bold">User Info:</p>
          <p className="break-all">ID: {userInfo?.data?.id}</p>
          <p className="break-all">Email: {userInfo?.data?.email}</p>
          <p className="break-all">Name: {userInfo?.data?.name}</p>
          <p className="break-all">Avatar: {userInfo?.data?.avatar_url}</p>
        </div>
      )}

      <div className="pt-4">
        <a href="/login">Retry</a>
      </div>

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {success && <p className="text-green-500">{success}</p>}
      {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
    </div>
  );
};

export default Page;
