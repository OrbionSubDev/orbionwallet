import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Switch
} from 'react-native';
import { useChain } from '../contexts/ChainContext';

const NetworkSettings = () => {
  const { chains, selectedChain, setSelectedChain, addChain } = useChain();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: '', symbol: '', rpc: '', logo: '', apiNetwork: '', address: ''
  });

  const handleAdd = () => {
    if (!form.name || !form.symbol || !form.rpc) {
      alert('Isi Name, Symbol, dan RPC!');
      return;
    }
    if (chains.find(c => c.rpc === form.rpc)) {
      alert('RPC sudah ada!');
      return;
    }
    addChain(form);
    setForm({ name: '', symbol: '', rpc: '', logo: '', apiNetwork: '', address: '' });
    setShowAdd(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Network</Text>
      <FlatList
        data={chains}
        keyExtractor={item => item.rpc}
        renderItem={({ item }) => {
          const isSelected = selectedChain && selectedChain.rpc === item.rpc;
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedChain(item)}
              style={[
                styles.chainItem,
                isSelected && styles.selectedItem
              ]}
            >
              <Switch
                value={isSelected}
                onValueChange={() => setSelectedChain(item)}
                trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
                thumbColor={isSelected ? '#2563eb' : '#f4f3f4'}
              />
              <Text style={[styles.symbol, isSelected && { color: '#2563eb' }]}>{item.symbol}</Text>
              <Text style={{ flex: 1 }}>{item.name}</Text>
              {isSelected && (
                <Text style={styles.selectedText}>Active</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
        <Text style={styles.addText}>Add Network</Text>
      </TouchableOpacity>

      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Custom Network</Text>
            {['name', 'symbol', 'rpc', 'logo', 'apiNetwork', 'address'].map((key) => (
              <TextInput
                key={key}
                placeholder={key}
                style={styles.input}
                value={form[key]}
                onChangeText={(v) => setForm({ ...form, [key]: v })}
                keyboardType={key === 'rpc' ? 'url' : 'default'}
              />
            ))}
            <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAdd(false)} style={{ marginTop: 8 }}>
              <Text style={{ textAlign: 'center', color: '#2563eb' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NetworkSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  chainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 10
  },
  selectedItem: {
    backgroundColor: '#dbeafe'
  },
  symbol: {
    fontWeight: 'bold',
    color: '#64748b',
    marginRight: 12,
    marginLeft: 10
  },
  selectedText: {
    color: '#2563eb',
    fontWeight: 'bold'
  },
  addBtn: {
    marginTop: 22,
    padding: 14,
    backgroundColor: '#2563eb',
    borderRadius: 10
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#0007',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: '90%'
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 10,
    padding: 7
  },
  saveBtn: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 7,
    marginTop: 8
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
