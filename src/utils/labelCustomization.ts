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
    case 'collectiondetail':
      return 'Collection Detail';
    case 'contractdetail':
      return 'Contract Detail';
    case 'filestorage':
      return 'File Storage';
    default:
      return path;
  }
};

export default getCustomLabel;
