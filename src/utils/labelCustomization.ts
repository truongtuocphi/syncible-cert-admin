const getCustomLabel = (path: string) => {
  switch (path) {
    case 'mintnft':
      return 'Mint NFT';
    case 'collection':
      return 'NFT Collection';
    case 'createcollection':
      return 'Create Collection';
    case 'admin':
      return 'Home';
    default:
      return 'abc';
  }
};

export default getCustomLabel;
