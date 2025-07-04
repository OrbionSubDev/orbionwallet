import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ethers } from 'ethers';
import { useChain } from '../contexts/ChainContext';

export default function AddTokenModal({ visible, onClose, onAdd }) {
  const { selectedChain } = useChain();

  const [address, setAddress] = useState('');
  const [info, setInfo] = useState({ name: '', symbol: '', decimals: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let isCancelled = false;
    const fetchToken = async () => {
      setErr('');
      setInfo({ name: '', symbol: '', decimals: '' });
      if (!address || address.length !== 42) return;
      try {
        setLoading(true);
        const provider = new ethers.JsonRpcProvider(selectedChain.rpc);
        const abi = [
          "function name() view returns (string)",
          "function symbol() view returns (string)",
          "function decimals() view returns (uint8)"
        ];
        const contract = new ethers.Contract(address, abi, provider);

        const [name, symbol, decimals] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals()
        ]);
        if (!isCancelled) setInfo({ name, symbol, decimals: String(decimals) });
      } catch (e) {
        if (!isCancelled) {
          setErr(
            'Gagal fetch token.\n' +
            (e.message || '') +
            '\nCek contract address, jaringan & endpoint RPC.'
          );
          console.log('ADD TOKEN ERROR:', e);
        }
      }
      if (!isCancelled) setLoading(false);
    };
    fetchToken();
    return () => { isCancelled = true; };
  }, [address, selectedChain]);

  const handleAdd = () => {
    if (!address || !info.name || !info.symbol || !info.decimals) {
      setErr('Lengkapi data token!');
      return;
    }
    onAdd({ ...info, address });
    setAddress('');
    setInfo({ name: '', symbol: '', decimals: '' });
    setErr('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{
        flex: 1, backgroundColor: '#0007', justifyContent: 'center', alignItems: 'center'
      }}>
        <View style={{
          width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 22
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Add Custom Token</Text>
          <TextInput
            placeholder="Token Contract Address"
            style={{
              borderBottomWidth: 1, borderColor: '#2563eb', marginBottom: 16, padding: 7
            }}
            value={address}
            onChangeText={v => {
              setErr('');
              setAddress(v.trim());
            }}
            autoCapitalize="none"
          />
          {loading && (
            <ActivityIndicator size="small" color="#2563eb" style={{ marginBottom: 8 }} />
          )}
          <TextInput
            placeholder="Name"
            style={{
              borderBottomWidth: 1, borderColor: '#2563eb', marginBottom: 10, padding: 7
            }}
            value={info.name}
            editable={false}
          />
          <TextInput
            placeholder="Symbol"
            style={{
              borderBottomWidth: 1, borderColor: '#2563eb', marginBottom: 10, padding: 7
            }}
            value={info.symbol}
            editable={false}
          />
          <TextInput
            placeholder="Decimals"
            style={{
              borderBottomWidth: 1, borderColor: '#2563eb', marginBottom: 10, padding: 7
            }}
            value={info.decimals}
            editable={false}
          />
          {err ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{err}</Text>
          ) : null}
          <TouchableOpacity
            style={{
              backgroundColor: '#2563eb', padding: 10, borderRadius: 7, marginBottom: 7
            }}
            onPress={handleAdd}
            disabled={!info.name || !info.symbol || !info.decimals || loading}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: '#2563eb', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
