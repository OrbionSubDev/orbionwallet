// src/screens/Home/HomeScreen.js
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, Text, Alert } from 'react-native';
import { useChain } from '../../contexts/ChainContext';
import { useWallet } from '../../contexts/WalletContext';
import { ethers } from 'ethers';
import WalletHeader from '../../components/WalletHeader';
import WalletValueCard from '../../components/WalletValueCard';
import TokenList from '../../components/TokenList';
import AddTokenModal from '../../components/AddTokenModal';

const NATIVE_API = {
  ETH: 'https://api.geckoterminal.com/api/v2/networks/eth/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  BNB: 'https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  tORB: 'https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0x9F20D823E9e1dA1935155bA643c650aBca5936a0',
};

export default function HomeScreen() {
  const { selectedChain } = useChain();
  const { address } = useWallet();
  const native = selectedChain?.nativeToken;

  // --- ALL IN! State Custom Token per Chain
  const [customTokensByChain, setCustomTokensByChain] = useState({});
  const [customTokens, setCustomTokens] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // --- Untuk detect perubahan chain & load customTokens sesuai chain
  useEffect(() => {
    if (!selectedChain) return;
    setCustomTokens(customTokensByChain[selectedChain.symbol] || []);
  }, [selectedChain, customTokensByChain]);

  // --- Simpan customTokens ke mapping per chain
  const updateCustomTokensForChain = useCallback(
    (updatedTokens) => {
      if (!selectedChain) return;
      setCustomTokens(updatedTokens);
      setCustomTokensByChain((prev) => ({
        ...prev,
        [selectedChain.symbol]: updatedTokens,
      }));
    },
    [selectedChain]
  );

  // --- Debug log
  const debugLog = (...args) => {
    console.log('[HomeScreen DEBUG]:', ...args);
  };

  // --- Get token price (Geckoterminal)
  const fetchTokenPrice = async (tokenAddress) => {
    if (!selectedChain || !selectedChain.chainId) {
      debugLog('fetchTokenPrice abort: selectedChain or chainId missing');
      return null;
    }
    try {
      let apiUrl = '';
      if (selectedChain.chainId === 56) {
        apiUrl = `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${tokenAddress}`;
      } else if (selectedChain.chainId === 1) {
        apiUrl = `https://api.geckoterminal.com/api/v2/networks/eth/tokens/${tokenAddress}`;
      } else {
        return null;
      }
      const res = await fetch(apiUrl);
      if (!res.ok) return null;
      const data = await res.json();
      const price = Number(data.data.attributes.price_usd);
      return price || null;
    } catch (e) {
      debugLog('fetchTokenPrice error:', e.message);
      return null;
    }
  };

  // --- Native
  const fetchNative = useCallback(async () => {
    if (!selectedChain || !address) return { bal: 0, prc: null };
    setLoading(true);
    let bal = 0, prc = null;
    try {
      const provider = new ethers.JsonRpcProvider(selectedChain.rpc);
      const rawBal = await provider.getBalance(address);
      bal = Number(ethers.formatEther(rawBal));
    } catch { bal = 0; }
    try {
      const apiUrl = NATIVE_API[native.symbol];
      const res = await fetch(apiUrl);
      const data = await res.json();
      prc = Number(data.data.attributes.price_usd);
    } catch { prc = null; }
    setLoading(false);
    return { bal, prc };
  }, [selectedChain, address, native?.symbol]);

  // --- ERC20 (dynamic decimals)
  const fetchERC20Balance = async (token, userAddress) => {
    try {
      const provider = new ethers.JsonRpcProvider(selectedChain.rpc);
      const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
      const contract = new ethers.Contract(token.address, erc20Abi, provider);
      const rawBal = await contract.balanceOf(userAddress);
      const decimals = Number(token.decimals);
      return Number(ethers.formatUnits(rawBal, isNaN(decimals) ? 18 : decimals));
    } catch {
      return 0;
    }
  };

  // --- Fetch all token (native + custom) dan price
  const fetchAllTokens = useCallback(async () => {
    if (!selectedChain || !address) return;
    setLoading(true);
    const { bal, prc } = await fetchNative();

    const arr = [
      {
        symbol: native.symbol,
        name: selectedChain.name,
        logo: native.logo,
        balance: bal,
        value: prc ? bal * prc : 0,
        isCustom: false,
        address: null,
      }
    ];
    for (const token of customTokens) {
      const bal = await fetchERC20Balance(token, address);
      const priceUsd = await fetchTokenPrice(token.address);
      arr.push({
        ...token,
        balance: bal,
        value: priceUsd ? bal * priceUsd : 0,
        isCustom: true,
      });
    }
    setTokens(arr);
    setLoading(false);
  }, [selectedChain, address, native, customTokens, fetchNative]);

  useEffect(() => {
    fetchAllTokens();
  }, [fetchAllTokens]);

  // --- Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllTokens().then(() => setRefreshing(false));
  }, [fetchAllTokens]);

  // --- Add token
  const handleAddToken = (token) => {
    if (customTokens.some(t => t.address.toLowerCase() === token.address.toLowerCase())) {
      Alert.alert('Token sudah ada di list!');
      return;
    }
    const updated = [...customTokens, token];
    updateCustomTokensForChain(updated);
  };

  // --- Delete token
  const handleDeleteToken = (token) => {
    const updated = customTokens.filter(t => t.address.toLowerCase() !== token.address.toLowerCase());
    updateCustomTokensForChain(updated);
  };

  // --- Portfolio total value
  const totalValue = tokens.reduce((acc, token) => acc + (token.value || 0), 0);

  return (
    <View style={styles.container}>
      <WalletHeader name="My Wallet" address={address} />
      <WalletValueCard
        chainLogo={native?.logo}
        chainName={selectedChain?.name}
        totalValue={loading ? '...' : `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
      />
      <TokenList
        tokens={tokens}
        loading={loading}
        onDelete={handleDeleteToken}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity style={styles.addTokenBtn} onPress={() => setShowAdd(true)}>
        <Text style={styles.addTokenText}>+ Add Token</Text>
      </TouchableOpacity>
      <AddTokenModal visible={showAdd} onClose={() => setShowAdd(false)} onAdd={handleAddToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, backgroundColor: '#f8fbff' },
  addTokenBtn: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 8,
    elevation: 2,
  },
  addTokenText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
