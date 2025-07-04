import React, { createContext, useContext, useState } from 'react';
import { CHAINS } from '../constants/evmChains';

const ChainContext = createContext();

export const useChain = () => useContext(ChainContext);

export const ChainProvider = ({ children }) => {
  const [chains, setChains] = useState(CHAINS);
  const [selectedChain, setSelectedChain] = useState(CHAINS[0]);

  // Add custom chain, cek rpc wajib unik!
  const addChain = (newChain) => {
    if (!newChain.rpc) {
      alert('Custom chain harus punya RPC!');
      return;
    }
    if (chains.find(c => c.rpc === newChain.rpc)) {
      alert('RPC sudah ada!');
      return;
    }
    setChains([...chains, newChain]);
  };

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain, chains, addChain }}>
      {children}
    </ChainContext.Provider>
  );
};
