// pages/api/oauth-token.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  code: string;
  code_verifier: string;
  client_id: string;
  redirect_uri: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Kiểm tra phương thức yêu cầu
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, code_verifier, client_id, redirect_uri }: RequestBody = req.body;

  try {
    const response = await fetch('https://api.basalwallet.com/api/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        code_verifier,
        client_id,
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}
