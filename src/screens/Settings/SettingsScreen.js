import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWallet } from '../../contexts/WalletContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { backupPhrase, privateKey, logout } = useWallet();

  const [showKey, setShowKey] = useState(false);
  const [longPressConfirm, setLongPressConfirm] = useState(false);

  const handleLongPressPrivateKey = () => {
    setLongPressConfirm(true);
    setTimeout(() => {
      setShowKey(true);
      setLongPressConfirm(false);
    }, 1000); // 1 detik delay kayak MetaMask
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('NetworkSettings')}>
        <Text style={styles.menuText}>Select Network</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Backup Phrase', backupPhrase)}>
        <Text style={styles.menuText}>Backup Phrase</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onLongPress={handleLongPressPrivateKey}
        delayLongPress={800}
      >
        <Text style={styles.menuText}>Show Private Key</Text>
        {longPressConfirm && <Text style={styles.subText}>Hold to confirm…</Text>}
        {showKey && <Text style={styles.keyText}>{privateKey}</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Language', 'Only English available')}>
        <Text style={styles.menuText}>Language: English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#fee2e2' }]} onPress={logout}>
        <Text style={[styles.menuText, { color: '#dc2626' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
  },
  menuItem: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subText: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 6
  },
  keyText: {
    marginTop: 8,
    color: '#2563eb',
    fontWeight: 'bold'
  }
});
