'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Callback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const state = searchParams.get('state') || '';

  const [codeVerifier, setCodeVerifier] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [responseData, setResponse] = useState<any>();

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
          refresh_token: '',
          redirect_uri: 'https://syncible-cert-admin.vercel.app/oauth/callback',
          code_verifier: localStorage.getItem('codeVerifier') || '',
          client_id: '14495804986765760978',
        }),
      };

      const res = await fetch('https://api.basalwallet.com/api/v1/oauth/token', options);
      setResponse(await res?.json());
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
      <p className="break-all">Code Verifier: {codeVerifier}</p>
      <p className="break-all">Code Authorization: {code}</p>
      <p className="break-all">Access token: {responseData?.data?.access_token || ''}</p>
      <p className="break-all">Refresh token: {responseData?.data?.refresh_token || ''}</p>
      <div className="pt-4">
        <a href="/oauth">Retry</a>
      </div>
    </div>
  );
};

export default Callback;
