import { ethers } from 'ethers';

import ABI from '@/contract/ABI.json';
import bytecodeJson from '@/contract/contractBytecode.json';

const deployContract = async (displayName: string, address: any, contractSymbol: string) => {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found');
  }

  const provider = new ethers.BrowserProvider(window.ethereum as any);
  const accounts = await provider.send('eth_requestAccounts', []);
  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }

  const signer = provider.getSigner();
  const abi = ABI;
  const bytecode = bytecodeJson.bytecode;
  const factory = new ethers.ContractFactory(abi, bytecode, await signer);

  const contract = await factory.deploy();

  //   const contract = await factory.deploy({
  //     gasPrice: ethers.parseUnits('100', 'gwei'),
  //     gasLimit: 9000000,
  //   });

  const receipt = await contract.deploymentTransaction()?.wait();
  if (!receipt) {
    throw new Error('Transaction receipt is null');
  }

  const deployedContract = new ethers.Contract(await contract.getAddress(), abi, await signer);

  const initializeTx = await deployedContract.initialize();
  await initializeTx.wait();

  // set owner contract
  const grantAdminTx = await deployedContract.grantAdminRole(address);
  await grantAdminTx.wait();

  const verifyContract = async (contractAddress: string) => {
    const apiKey = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
    const sourceCode = `
    pragma solidity ^0.8.0;
    import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
    import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
    import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
    import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

    contract CertificateNFTV3 is
        Initializable,
        ERC721URIStorageUpgradeable,
        AccessControlUpgradeable,
        UUPSUpgradeable
    {
        uint256 private _tokenIds;
        string private _baseTokenURI;
        mapping(uint256 => string) private _certIds;
        mapping(uint256 => CertificateData) private _certData;

        struct CertificateData {
            string date;
            string templateURL; 
        }

        struct MintData {
            address owner;
            string fullName;
            string certificateId;
            string tokenURI;
            CertificateData certData;
        }

        event CertificateMinted(
            address indexed to,
            uint256 indexed tokenId,
            string certificateId,
            string fullName,
            string date,
            string templateURL
        );

        function initialize() public initializer {
            __ERC721_init("${displayName}", "${contractSymbol}");
            __ERC721URIStorage_init();
            __AccessControl_init();
            __UUPSUpgradeable_init();
            _baseTokenURI = "";
            _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        }

        function supportsInterface(
            bytes4 interfaceId
        )
            public
            view
            override(AccessControlUpgradeable, ERC721URIStorageUpgradeable)
            returns (bool)
        {
            return super.supportsInterface(interfaceId);
        }

        function _authorizeUpgrade(
            address newImplementation
        ) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

        function mintBulk(
            MintData[] calldata mintDataArray
        ) public onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256[] memory) {
            uint256[] memory newTokenIds = new uint256[](mintDataArray.length);

            for (uint256 i = 0; i < mintDataArray.length; i++) {
                newTokenIds[i] = _mintSingle(
                    mintDataArray[i].owner,
                    mintDataArray[i].fullName,
                    mintDataArray[i].certificateId,
                    mintDataArray[i].tokenURI,
                    mintDataArray[i].certData
                );
            }

            return newTokenIds;
        }

        function _mintSingle(
            address owner,
            string memory fullName,
            string memory certificateId,
            string memory tokenURI,
            CertificateData memory certData
        ) internal returns (uint256) {
            _tokenIds += 1;
            _certIds[_tokenIds] = certificateId;
            _certData[_tokenIds] = certData;

            uint256 newTokenId = _tokenIds;
            _mint(owner, newTokenId);
            _setTokenURI(newTokenId, tokenURI);

            emit CertificateMinted(
                owner,
                newTokenId,
                certificateId,
                fullName,
                certData.date,
                certData.templateURL
            );

            return newTokenId;
        }

        function _baseURI() internal view override returns (string memory) {
            return _baseTokenURI;
        }

        function setBaseURI(
            string memory newBaseURI
        ) public onlyRole(DEFAULT_ADMIN_ROLE) {
            _baseTokenURI = newBaseURI;
        }

        function setTokenURI(
            uint256 tokenId,
            string memory tokenURI
        ) public onlyRole(DEFAULT_ADMIN_ROLE) {
            _setTokenURI(tokenId, tokenURI);
        }

        function getCertId(uint256 tokenId) public view returns (string memory) {
            return _certIds[tokenId];
        }

        function getCertData(
            uint256 tokenId
        ) public view returns (CertificateData memory) {
            return _certData[tokenId];
        }

        function grantAdminRole(
            address account
        ) public onlyRole(DEFAULT_ADMIN_ROLE) {
            grantRole(DEFAULT_ADMIN_ROLE, account);
        }

        function revokeAdminRole(
            address account
        ) public onlyRole(DEFAULT_ADMIN_ROLE) {
            revokeRole(DEFAULT_ADMIN_ROLE, account);
        }
    }
    `;

    const verificationParams = new URLSearchParams({
      apikey: apiKey || '',
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: 'solidity-single-file',
      contractname: displayName,
      compilerversion: 'v0.8.0+commit.c7dfd78e',
      optimizationUsed: '1',
      runs: '200',
    });

    const response = await fetch('https://api.polygonscan.com/api', {
      method: 'POST',
      body: verificationParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    if (data.status === '1') {
      console.log('Contract verified successfully:', data.result);
    } else {
      console.error('Failed to verify contract:', data.result);
    }
  };

  await verifyContract(await contract.getAddress());

  return contract.getAddress();
};

export default deployContract;
