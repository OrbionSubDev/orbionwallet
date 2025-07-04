import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  // State wallet address
  const [address, setAddress] = useState('');
  
  // Simulasi: Ambil seed & privateKey dari secure storage di real app!
  const [backupPhrase, setBackupPhrase] = useState('seed phrase example here');
  const [privateKey, setPrivateKey] = useState('0x1234...abcd');

  // Simulasi logout
  const logout = () => {
    setAddress('');
    setBackupPhrase('');
    setPrivateKey('');
    // Tambah: hapus data storage, redirect ke login, dsb
  };

  // Tambahkan fungsi lain sesuai kebutuhan app lo

  return (
    <WalletContext.Provider
      value={{
        address,
        setAddress,
        backupPhrase,
        privateKey,
        logout,
        setBackupPhrase,
        setPrivateKey,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
