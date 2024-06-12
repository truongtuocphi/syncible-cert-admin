import { useQuery } from '@tanstack/react-query';
import { Contract, getDefaultProvider } from 'ethers';

import { CERTIFICATE_NFT_CONTRACT, certificateNFTContractConfig } from '@/config/contract';

export const useEventLogs = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['eventLogs'],
    queryFn: async () => {
      const provider = getDefaultProvider(
        process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-mainnet.infura.io'
      );

      const contract = new Contract(
        CERTIFICATE_NFT_CONTRACT,
        certificateNFTContractConfig.abi,
        provider
      );

      const results = await contract.queryFilter(contract.filters.FlipResult);

      return results.reverse().slice(0, 20);
    },
    refetchInterval: 5000,
  });

  return { data, ...rest };
};
