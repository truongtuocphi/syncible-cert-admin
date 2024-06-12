// import { useMemo } from 'react';

// import { formatUnits, Hex } from 'viem';
// import { useAccount, useReadContract } from 'wagmi';

// import { CERTIFICATE_NFT_CONTRACT } from '@/config/contract';

// export const useAllowance = () => {
//   const { address } = useAccount();

//   const {
//     data: allowance,
//     isSuccess: isFetchAllowance,
//     ...rest
//   } = useReadContract({
//     ...usdtContractConfig,
//     functionName: 'allowance',
//     args: [address as Hex, CERTIFICATE_NFT_CONTRACT],
//   });

//   return useMemo(() => {
//     return {
//       allowance: allowance ? formatUnits(allowance as bigint, 6) : 0,
//       ...rest,
//     };
//   }, [address, isFetchAllowance, allowance]);
// };
