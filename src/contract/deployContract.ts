import { ethers } from 'ethers';
import ABI from '@/contract/ABI.json';
import bytecodeJson from '@/contract/contractBytecode.json';

const deployContract = async () => {
  // Kiểm tra nếu window.ethereum có sẵn
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found');
  }

  // Tạo một provider từ MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum as any);

  // Yêu cầu quyền truy cập tài khoản của người dùng
  const accounts = await provider.send('eth_requestAccounts', []);
  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }

  // Lấy signer (ví của người dùng)
  const signer = provider.getSigner();

  const abi = ABI;
  const bytecode = bytecodeJson.bytecode;

  // Tạo một contract factory
  const factory = new ethers.ContractFactory(abi, bytecode, await signer);

  // Triển khai hợp đồng với cấu hình gas
  const contract = await factory.deploy({
    gasLimit: 5000000, // Giới hạn gas
    gasPrice: ethers.parseUnits('50', 'gwei'), // Giá gas
  });

  // Chờ cho giao dịch triển khai hợp đồng được khai thác
  const receipt = await contract.deploymentTransaction()?.wait();

  if (!receipt) {
    throw new Error('Transaction receipt is null');
  }

  return contract.getAddress(); // Trả về địa chỉ của hợp đồng mới triển khai
};

export default deployContract;
