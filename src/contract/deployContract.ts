import { ethers } from 'ethers';

import ABI from '@/contract/ABI.json';
import bytecodeJson from '@/contract/contractBytecode.json';

const deployContract = async () => {
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

  // Triển khai hợp đồng
  const contract = await factory.deploy({
    gasLimit: 7000000,
    gasPrice: ethers.parseUnits('70', 'gwei'),
  });

  // Chờ cho giao dịch triển khai hợp đồng được khai thác
  const receipt = await contract.deploymentTransaction()?.wait();
  if (!receipt) {
    throw new Error('Transaction receipt is null');
  }

  // Tạo một hợp đồng mới với ABI và địa chỉ triển khai
  const deployedContract = new ethers.Contract(await contract.getAddress(), abi, await signer);

  // Gọi hàm initialize
  const tx = await deployedContract.initialize();
  await tx.wait();

  return contract.getAddress();
};

export default deployContract;
