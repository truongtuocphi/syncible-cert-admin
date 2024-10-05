'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || ''; // Lấy mã code từ URL
  const state = searchParams.get('state') || ''; // Lấy state từ URL

  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [responseData, setResponse] = useState<any>();

  const handleGetAccessToken = async () => {
    try {
      // Kiểm tra state trong localStorage
      const storedState = localStorage.getItem('state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter');
      }

      // Gọi proxy API route thay vì gọi trực tiếp Basal API
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: 'http://localhost:3000/oauth/callback', // URI của ứng dụng
          code_verifier: localStorage.getItem('codeVerifier') || '', // Lấy code_verifier từ localStorage
          client_id: '14437770757134244933', // Client ID
        }),
      };

      console.log('Sending options:', options.body);

      // Gửi yêu cầu đến proxy route
      const res = await fetch('/api/oauth-token', options);

      if (!res.ok) {
        throw new Error(`Failed to fetch access token. Status: ${res.status}`);
      }

      const responseData = await res.json();
      setResponse(responseData);

      // Lưu access token vào localStorage
      setAccessToken(responseData.access_token);
      localStorage.setItem('accessToken', responseData.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
      alert(`Error fetching access token: ${error}`);
    }
  };

  useEffect(() => {
    // Lấy code_verifier từ localStorage
    setCodeVerifier(localStorage.getItem('codeVerifier') || '');

    // Nếu có code, gọi hàm lấy access token
    if (code) {
      handleGetAccessToken();
    }
  }, [code]);

  return (
    <div className="m-10 mx-auto w-2/3 space-y-4">
      <p className="break-all">Code Verifier: {codeVerifier}</p>
      <p className="break-all">Code Authorization: {code}</p>
      <p className="break-all">Access token: {responseData?.access_token || ''}</p>
      <p className="break-all">Refresh token: {responseData?.refresh_token || ''}</p>
      <div className="pt-4">
        <a href="/login">Retry</a>
      </div>
    </div>
  );
};

export default Page;
