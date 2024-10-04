'use client';

import { useSearchParams, useRouter } from 'next/navigation'; // Hook để lấy tham số từ URL
import { useEffect, useState } from 'react';

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || ''; // Lấy mã xác thực từ URL
  const state = searchParams.get('state') || ''; // Lấy trạng thái từ URL

  const [codeVerifier, setCodeVerifier] = useState('');
  const [responseData, setResponse] = useState<any>(null);
  const clientId = '14495804986765760978';
  const redirectUri = 'https://syncible-cert-admin.vercel.app/oauth/callback';

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
          grant_type: 'authorization_code,refresh_token',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: localStorage.getItem('codeVerifier') || '',
          client_id: clientId,
        }),
      };

      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/token', options);
      const data = await res.json();
      setResponse(data);

      if (data.success) {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
        router.push('/admin');
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setCodeVerifier(localStorage.getItem('codeVerifier') || '');
    handleGetAccessToken();
  }, []);

  return (
    <div className="m-10 mx-auto w-2/3 space-y-4">
      <h1 className="text-lg font-bold">Callback Response</h1>
      <p className="break-all">Code Verifier: {codeVerifier}</p>
      <p className="break-all">Code Authorization: {code}</p>
      <p className="break-all">Access Token: {responseData?.data?.access_token || ''}</p>
      <p className="break-all">Refresh Token: {responseData?.data?.refresh_token || ''}</p>
      <div className="pt-4">
        <a href="/oauth">Retry</a>
      </div>
    </div>
  );
};

export default Callback;
