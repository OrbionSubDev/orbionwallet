import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WalletValueCard = ({ chainLogo, chainName, totalValue }) => (
  <View style={styles.card}>
    <View style={styles.logoWrapper}>
      <Image source={chainLogo} style={styles.logo} />
    </View>
    <View>
      <Text style={styles.label}>Total Value</Text>
      <Text style={styles.value}>{totalValue}</Text>
      <Text style={styles.chainName}>{chainName}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#2563eb', borderRadius: 18,
    padding: 18, marginBottom: 22, width: '100%',
  },
  logoWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    marginRight: 16,
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: { width: 44, height: 44, resizeMode: 'contain' },
  label: { color: '#dbeafe', fontSize: 14 },
  value: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 1 },
  chainName: { color: '#dbeafe', fontSize: 13, fontWeight: 'bold' },
});
export default WalletValueCard;
