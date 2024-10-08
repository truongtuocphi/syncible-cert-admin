export default function truncateAddress(address: string, startLength = 6, endLength = 4) {
  return `${address?.slice(0, startLength)}...${address?.slice(-endLength)}`;
}
