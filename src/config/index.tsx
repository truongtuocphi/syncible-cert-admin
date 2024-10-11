import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { createPublicClient, http } from 'viem';
import { cookieStorage, createStorage } from 'wagmi';
import { polygon, polygonAmoy, baseGoerli, base } from 'wagmi/chains';

export const network: any[] =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true' ? [polygon, base] : [polygonAmoy, baseGoerli];

// export const decimals =
//   10 ** (process.env.NEXT_PUBLIC_TOKEN_DECIMAL ? +process.env.NEXT_PUBLIC_TOKEN_DECIMAL : 6);

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Basalwallet',
  description: 'Basalwallet',
  url: '', // origin must match your domain & subdomain
  icons: [],
};

// Create wagmiConfig
// const chains = [mainnet, sepolia] as const;
export const config = defaultWagmiConfig({
  chains: [polygon, base],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const viemClient = createPublicClient({
  chain: process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true' ? polygon : polygonAmoy,
  transport: http(),
});
