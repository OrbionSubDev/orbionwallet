import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/WalletContext'; // PENTING

const ImportWithPrivateKeyScreen = ({ navigation }) => {
  const { setAddress } = useWallet();
  const [privateKey, setPrivateKey] = useState('');

  const importWallet = () => {
    try {
      const pk = privateKey.trim().startsWith('0x') ? privateKey.trim() : `0x${privateKey.trim()}`;
      const wallet = new ethers.Wallet(pk);
      setAddress(wallet.address); // SET ADDRESS CONTEXT
      Alert.alert('Success', 'Wallet imported!', [
        { text: 'OK', onPress: () => navigation.replace('MainTabs') },
      ]);
    } catch (err) {
      Alert.alert('Invalid Private Key', 'Cek lagi private key!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Import Wallet with Private Key</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your private key (0x...)"
        autoCapitalize="none"
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <TouchableOpacity style={styles.button} onPress={importWallet}>
        <Text style={styles.buttonText}>Import Wallet</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  input: { borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 12, fontSize: 18, padding: 14, backgroundColor: '#f9fafb', marginBottom: 18 },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default ImportWithPrivateKeyScreen;
