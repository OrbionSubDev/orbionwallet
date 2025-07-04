// src/screens/Welcome/WelcomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to WalletMultichain</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('CreateWallet')}
    >
      <Text style={styles.buttonText}>Create New Wallet</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('ImportWallet')}
    >
      <Text style={styles.buttonText}>Import Wallet</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, color: '#222' },
  button: { width: '100%', padding: 16, backgroundColor: '#2563eb', borderRadius: 12, marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default WelcomeScreen;
