import { Hex } from 'viem';

export const CERTIFICATE_NFT_CONTRACT = process.env.NEXT_PUBLIC_CERTIFICATE_NFT_CONTRACT! as Hex;

// export const usdtContractConfig = {
//   address: ERC20_CONTRACT,
//   abi: [
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'spender',
//           type: 'address',
//         },
//         {
//           internalType: 'uint256',
//           name: 'allowance',
//           type: 'uint256',
//         },
//         {
//           internalType: 'uint256',
//           name: 'needed',
//           type: 'uint256',
//         },
//       ],
//       name: 'ERC20InsufficientAllowance',
//       type: 'error',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'sender',
//           type: 'address',
//         },
//         {
//           internalType: 'uint256',
//           name: 'balance',
//           type: 'uint256',
//         },
//         {
//           internalType: 'uint256',
//           name: 'needed',
//           type: 'uint256',
//         },
//       ],
//       name: 'ERC20InsufficientBalance',
//       type: 'error',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'approver',
//           type: 'address',
//         },
//       ],
//       name: 'ERC20InvalidApprover',
//       type: 'error',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'receiver',
//           type: 'address',
//         },
//       ],
//       name: 'ERC20InvalidReceiver',
//       type: 'error',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'sender',
//           type: 'address',
//         },
//       ],
//       name: 'ERC20InvalidSender',
//       type: 'error',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'spender',
//           type: 'address',
//         },
//       ],
//       name: 'ERC20InvalidSpender',
//       type: 'error',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'owner',
//           type: 'address',
//         },
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'spender',
//           type: 'address',
//         },
//         {
//           indexed: false,
//           internalType: 'uint256',
//           name: 'value',
//           type: 'uint256',
//         },
//       ],
//       name: 'Approval',
//       type: 'event',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'from',
//           type: 'address',
//         },
//         {
//           indexed: true,
//           internalType: 'address',
//           name: 'to',
//           type: 'address',
//         },
//         {
//           indexed: false,
//           internalType: 'uint256',
//           name: 'value',
//           type: 'uint256',
//         },
//       ],
//       name: 'Transfer',
//       type: 'event',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'owner',
//           type: 'address',
//         },
//         {
//           internalType: 'address',
//           name: 'spender',
//           type: 'address',
//         },
//       ],
//       name: 'allowance',
//       outputs: [
//         {
//           internalType: 'uint256',
//           name: '',
//           type: 'uint256',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'spender',
//           type: 'address',
//         },
//         {
//           internalType: 'uint256',
//           name: 'value',
//           type: 'uint256',
//         },
//       ],
//       name: 'approve',
//       outputs: [
//         {
//           internalType: 'bool',
//           name: '',
//           type: 'bool',
//         },
//       ],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'account',
//           type: 'address',
//         },
//       ],
//       name: 'balanceOf',
//       outputs: [
//         {
//           internalType: 'uint256',
//           name: '',
//           type: 'uint256',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'decimals',
//       outputs: [
//         {
//           internalType: 'uint8',
//           name: '',
//           type: 'uint8',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'name',
//       outputs: [
//         {
//           internalType: 'string',
//           name: '',
//           type: 'string',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'symbol',
//       outputs: [
//         {
//           internalType: 'string',
//           name: '',
//           type: 'string',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [],
//       name: 'totalSupply',
//       outputs: [
//         {
//           internalType: 'uint256',
//           name: '',
//           type: 'uint256',
//         },
//       ],
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'to',
//           type: 'address',
//         },
//         {
//           internalType: 'uint256',
//           name: 'value',
//           type: 'uint256',
//         },
//       ],
//       name: 'transfer',
//       outputs: [
//         {
//           internalType: 'bool',
//           name: '',
//           type: 'bool',
//         },
//       ],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       inputs: [
//         {
//           internalType: 'address',
//           name: 'from',
//           type: 'address',
//         },
//         {
//           internalType: 'address',
//           name: 'to',
//           type: 'address',
//         },
//         {
//           internalType: 'uint256',
//           name: 'value',
//           type: 'uint256',
//         },
//       ],
//       name: 'transferFrom',
//       outputs: [
//         {
//           internalType: 'bool',
//           name: '',
//           type: 'bool',
//         },
//       ],
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//   ],
// } as const;

export const certificateNFTContractConfig = {
  address: CERTIFICATE_NFT_CONTRACT,
  abi: [
    {
      inputs: [],
      name: 'AccessControlBadConfirmation',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'neededRole',
          type: 'bytes32',
        },
      ],
      name: 'AccessControlUnauthorizedAccount',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address',
        },
      ],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    {
      inputs: [],
      name: 'ERC1967NonPayable',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721IncorrectOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721InsufficientApproval',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'approver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidApprover',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOperator',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'receiver',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidReceiver',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'ERC721InvalidSender',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ERC721NonexistentToken',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FailedInnerCall',
      type: 'error',
    },
    {
      inputs: [],
      name: 'InvalidInitialization',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotInitializing',
      type: 'error',
    },
    {
      inputs: [],
      name: 'UUPSUnauthorizedCallContext',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'slot',
          type: 'bytes32',
        },
      ],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_fromTokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_toTokenId',
          type: 'uint256',
        },
      ],
      name: 'BatchMetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'certificateId',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'fullName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'organizationName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'headName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'headPosition',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'headSignature',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'position',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'date',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'blockchainType',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'templateURL',
          type: 'string',
        },
      ],
      name: 'CertificateMinted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'MetadataUpdate',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'previousAdminRole',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'newAdminRole',
          type: 'bytes32',
        },
      ],
      name: 'RoleAdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getCertData',
      outputs: [
        {
          components: [
            {
              internalType: 'string',
              name: 'organizationName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'headName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'headPosition',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'headSignature',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'position',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'date',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'blockchainType',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'templateURL',
              type: 'string',
            },
          ],
          internalType: 'struct CertificateNFTV3.CertificateData',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'getCertId',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantAdminRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'fullName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'certificateId',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'tokenURI',
              type: 'string',
            },
            {
              components: [
                {
                  internalType: 'string',
                  name: 'organizationName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'headName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'headPosition',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'headSignature',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'description',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'position',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'date',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'blockchainType',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'templateURL',
                  type: 'string',
                },
              ],
              internalType: 'struct CertificateNFTV3.CertificateData',
              name: 'certData',
              type: 'tuple',
            },
          ],
          internalType: 'struct CertificateNFTV3.MintData[]',
          name: 'mintDataArray',
          type: 'tuple[]',
        },
      ],
      name: 'mintBulk',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'callerConfirmation',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeAdminRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'newBaseURI',
          type: 'string',
        },
      ],
      name: 'setBaseURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'tokenURI',
          type: 'string',
        },
      ],
      name: 'setTokenURI',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ],
} as const;
