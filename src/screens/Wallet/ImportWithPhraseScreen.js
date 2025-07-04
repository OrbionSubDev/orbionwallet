import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/WalletContext'; // PENTING

const ImportWithPhraseScreen = ({ navigation }) => {
  const { setAddress } = useWallet();
  const [mnemonic, setMnemonic] = useState('');

  const importWallet = () => {
    try {
      const wallet = ethers.Wallet.fromPhrase(mnemonic.trim().toLowerCase());
      setAddress(wallet.address);  // SET ADDRESS CONTEXT
      Alert.alert('Success', 'Wallet imported!', [
        { text: 'OK', onPress: () => navigation.replace('MainTabs') },
      ]);
    } catch (err) {
      Alert.alert('Invalid Mnemonic', 'Pastikan 12/24 kata benar!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Import Wallet with Phrase</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your 12/24 words phrase"
        multiline
        autoCapitalize="none"
        value={mnemonic}
        onChangeText={setMnemonic}
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
  input: { minHeight: 70, borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 12, fontSize: 18, padding: 14, backgroundColor: '#f9fafb', marginBottom: 18 },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default ImportWithPhraseScreen;
