import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ethers } from 'ethers';
import Clipboard from '@react-native-clipboard/clipboard';
import { useWallet } from '../../contexts/WalletContext'; // PENTING

const CreateWalletScreen = ({ navigation }) => {
  const { setAddress } = useWallet(); // Ambil setAddress dari context
  const [mnemonic, setMnemonic] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setMnemonic(wallet.mnemonic.phrase);
    setShowMnemonic(true);
    setCopied(false);
    setAddress(wallet.address);  // SET ADDRESS DI CONTEXT
  };

  const handleCopy = () => {
    Clipboard.setString(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleContinue = () => {
    if (!mnemonic) return;
    navigation.navigate('VerifyMnemonic', { mnemonic });
  };

  // Grid mnemonic kata (3 kolom x 4 baris)
  const mnemonicWords = mnemonic ? mnemonic.split(' ') : [];
  const grid = [[], [], []];
  mnemonicWords.forEach((word, i) => {
    grid[i % 3].push({ word, idx: i + 1 });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Wallet Baru</Text>
      <Text style={styles.desc}>
        Dompet non-custodial, mnemonic hanya kamu yang pegang. Simpan baik-baik!
      </Text>
      <TouchableOpacity style={styles.buttonPrimary} onPress={generateWallet}>
        <Text style={styles.buttonTextPrimary}>Generate Phrase</Text>
      </TouchableOpacity>

      {showMnemonic && (
        <>
          <View style={styles.mnemonicCard}>
            <View style={styles.mnemonicGrid}>
              {Array.from({ length: 4 }).map((_, rowIdx) => (
                <View style={styles.mnemonicRow} key={rowIdx}>
                  {Array.from({ length: 3 }).map((_, colIdx) => {
                    const item = grid[colIdx][rowIdx];
                    if (!item) return <View style={styles.mnemonicCell} key={colIdx} />;
                    return (
                      <View style={styles.mnemonicCell} key={colIdx}>
                        <Text style={styles.mnemonicIndex}>
                          {item.idx.toString().padStart(2, '0')}.
                        </Text>
                        <Text selectable style={styles.mnemonicWord}>{item.word}</Text>
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={[styles.copyBtn, copied && styles.copyBtnCopied]}
            onPress={handleCopy}
            activeOpacity={0.85}
          >
            <Text style={[styles.copyBtnText, copied && styles.copyBtnTextCopied]}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContinue} onPress={handleContinue}>
            <Text style={styles.buttonTextContinue}>Sudah Dicatat, Lanjut!</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (gunakan style yang sudah kamu punya)
  container: {
    flex: 1,
    padding: 28,
    backgroundColor: '#f8fbff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#175cd3',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  desc: {
    fontSize: 15,
    color: '#415a77',
    textAlign: 'center',
    marginBottom: 26,
    opacity: 0.85,
  },
  buttonPrimary: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#175cd3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 32,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  mnemonicCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 10,
    shadowColor: '#2052a3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 6,
  },
  mnemonicGrid: {
    width: '100%',
    justifyContent: 'space-between',
  },
  mnemonicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%',
    gap: 3,
  },
  mnemonicCell: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f8ff',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    shadowColor: '#2563eb',
    shadowOpacity: 0.05,
    marginHorizontal: 1,
  },
  mnemonicIndex: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 15,
    marginRight: 4,
    width: 24,
    textAlign: 'right',
  },
  mnemonicWord: {
    fontSize: 17,
    color: '#111',
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'left',
  },
  copyBtn: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#2563eb',
    borderRadius: 13,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  copyBtnCopied: {
    backgroundColor: '#36c98c',
  },
  copyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  copyBtnTextCopied: {
    color: '#fff',
  },
  buttonContinue: {
    width: '100%',
    backgroundColor: '#36c98c',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#36c98c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 6,
  },
  buttonTextContinue: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

export default CreateWalletScreen;
