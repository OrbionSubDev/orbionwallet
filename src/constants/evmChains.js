export const CHAINS = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    chainId: 1,                                  // <== tambahan chainId
    rpc: 'https://rpc.ankr.com/eth',
    logo: require('../assets/ChainLogo/Ethereum-Mainnet.png'),
    nativeToken: {
      symbol: 'ETH',
      apiNetwork: 'eth',
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      logo: require('../assets/ChainLogo/Ethereum-Mainnet.png')
    }
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    chainId: 56,                                // <== tambahan chainId
    rpc: 'https://bsc-dataseed.binance.org',
    logo: require('../assets/ChainLogo/Binance-Mainnet.png'),
    nativeToken: {
      symbol: 'BNB',
      apiNetwork: 'bsc',
      address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      logo: require('../assets/ChainLogo/Binance-Mainnet.png')
    }
  },
  {
    name: 'Orbion Testnet',
    symbol: 'tORB',
    chainId: 109901,                            // <== tambahan chainId
    rpc: 'https://rpc-testnet-zero1.orbionchain.com/',
    logo: require('../assets/ChainLogo/OrbionTestnet.png'),
    nativeToken: {
      symbol: 'tORB',
      apiNetwork: 'bsc',
      address: '0x9F20D823E9e1dA1935155bA643c650aBca5936a0',
      logo: require('../assets/ChainLogo/OrbionTestnet.png')
    }
  }
];
