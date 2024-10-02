export interface CollectionData {
  mintData?: any;
  address?: string;
  bannerImage?: string | undefined;
  contractAddress?: string | undefined;
  contractName?: string | undefined;
  contractSymbol?: string | undefined;
  description?: string | undefined;
  displayName?: string | undefined;
  logoImage?: string | undefined;
  createdAt?: string | undefined;
}

export interface Collection {
  id: string;
  displayName: string;
  contractAddress: string;
}
