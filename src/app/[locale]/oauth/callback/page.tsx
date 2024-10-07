'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ref, set, get } from 'firebase/database'; // Sử dụng get để kiểm tra user
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Sử dụng để tạo user với email và password
import { db, auth } from '@/lib/firebase'; // Firebase Realtime Database

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';
  const router = useRouter(); // Dùng để điều hướng trang

  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [responseData, setResponse] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>(null);

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

      const basalId = userInfoData.data.id; // ID từ Basal API

      // Lấy current user từ Firebase Auth
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = ref(db, 'users/' + currentUser.uid); // Sử dụng uid của currentUser

        // Kiểm tra xem user đã tồn tại trong Firebase chưa
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const storedBasalId = userSnapshot.val().basalId;

          // So sánh basalId đã lưu với basalId hiện tại
          if (storedBasalId === basalId) {
            // Nếu trùng khớp, điều hướng trực tiếp đến /admin
            router.push('/admin');
          } else {
            alert('ID từ Basal không khớp với thông tin đã lưu');
          }
        } else {
          // Tạo user mới trong Firebase Auth nếu chưa tồn tại
          const fakePassword = '123123'; // Password giả, không cần thực sự
          await createUserWithEmailAndPassword(auth, userInfoData?.data?.email, fakePassword);

          // Lưu thông tin vào Firebase Realtime Database
          await set(userRef, {
            uid: currentUser.uid, // Dùng uid của currentUser
            basalId: basalId, // ID từ Basal API
            name: userInfoData.data.name || 'Anonymous',
            email: userInfoData.data.email,
            avatar: userInfoData.data.avatar_url || '',
            createdAt: new Date().toISOString(),
          });

          // Điều hướng đến trang /admin sau khi lưu
          router.push('/admin');
        }
      } else {
        alert('Failed to retrieve current user from Firebase Auth');
      }
    } catch (error) {
      alert('Failed to fetch user info or save to Firebase');
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
    </div>
  );
};

export default Page;
