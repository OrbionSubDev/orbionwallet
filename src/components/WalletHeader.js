import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const WalletHeader = ({ name, address }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.walletName}>{name}</Text>
      <View style={styles.addressRow}>
        <Text
          style={styles.walletAddress}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {address}
        </Text>
        <TouchableOpacity onPress={handleCopy} activeOpacity={0.7}>
          <Text style={styles.copyText}>{copied ? 'Copied!' : 'Copy'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  walletName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    letterSpacing: 0.2,
    marginBottom: 7,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 7,
    maxWidth: 330,
    backgroundColor: '#f4f7fd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  walletAddress: {
    color: '#222',
    fontSize: 15,
    fontFamily: 'monospace',
    maxWidth: 190,
    opacity: 0.84,
  },
  copyText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 7,
  }
});
export default WalletHeader;
