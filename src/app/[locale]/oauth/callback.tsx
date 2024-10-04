'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy mã xác thực từ URL
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  const clientId = '14437770757134244933'; // Client ID từ Basal SSO
  const redirectUri = 'http://localhost:3000/oauth/callback'; // URL callback phải khớp với cấu hình Basal SSO

  // Hàm lấy access token từ Basal SSO
  const handleGetAccessToken = async () => {
    const storedState = localStorage.getItem('state'); // Lấy state đã lưu từ localStorage

    if (!storedState || storedState !== state) {
      throw new Error('Invalid state parameter'); // So sánh state từ URL và localStorage
    }

    try {
      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          code_verifier: localStorage.getItem('codeVerifier') || '',
          client_id: clientId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Lưu access token vào localStorage
        localStorage.setItem('access_token', data.data.access_token);
        // Chuyển hướng người dùng đến trang admin
        router.push('/admin');
      } else {
        console.error('Error fetching access token:', data);
      }
    } catch (error) {
      console.error('Error during token request:', error);
    }
  };

  useEffect(() => {
    // Thực thi hàm lấy access token sau khi component được render
    handleGetAccessToken();
  }, []);

  return <p>Redirecting to admin...</p>;
}
