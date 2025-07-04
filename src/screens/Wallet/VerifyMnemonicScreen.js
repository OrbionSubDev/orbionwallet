import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const getRandomIndexes = (len, count = 4) => {
  const arr = Array.from({ length: len }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count).sort((a, b) => a - b);
};

const VerifyMnemonicScreen = ({ route, navigation }) => {
  // mnemonic dari route params
  const { mnemonic } = route.params || {};
  const mnemonicWords = mnemonic ? mnemonic.split(' ') : [];

  // Pilih 4 index acak
  const [indexes, setIndexes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (mnemonicWords.length > 0) {
      setIndexes(getRandomIndexes(mnemonicWords.length, 4));
    }
  }, [mnemonic]);

  const handleChange = (idx, value) => {
    setAnswers((prev) => ({
      ...prev,
      [idx]: value.trim().toLowerCase(),
    }));
  };

  const handleSubmit = () => {
    let fail = false;
    for (const idx of indexes) {
      if (
        !answers[idx] ||
        answers[idx] !== mnemonicWords[idx].toLowerCase()
      ) {
        fail = true;
        break;
      }
    }
    if (fail) {
      setError('Ada jawaban salah. Coba lagi.');
      setAnswers({});
    } else {
      setError('');
      Alert.alert('Verifikasi Berhasil', 'Mnemonic benar!', [
        { text: 'Lanjut', onPress: () => navigation.replace('MainTabs') },
      ]);
    }
  };

  if (indexes.length !== 4) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifikasi Mnemonic</Text>
      <Text style={styles.desc}>
        Isi kata ke:
        {' '}
        <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>{indexes.map(i => i + 1).join(', ')}</Text>
      </Text>

      <View style={styles.inputRow}>
        {indexes.map((idx) => (
          <View style={styles.inputCell} key={idx}>
            <Text style={styles.inputLabel}>Kata ke-{idx + 1}</Text>
            <TextInput
              style={styles.inputBox}
              value={answers[idx] || ''}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(v) => handleChange(idx, v)}
              placeholder="....."
              placeholderTextColor="#bbb"
            />
          </View>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.buttonVerify} onPress={handleSubmit}>
        <Text style={styles.buttonVerifyText}>Verifikasi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#f8fbff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#175cd3', marginBottom: 10, letterSpacing: 0.2 },
  desc: { fontSize: 16, color: '#415a77', marginBottom: 30, textAlign: 'center' },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 24 },
  inputCell: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  inputLabel: { fontSize: 14, color: '#2563eb', marginBottom: 6, fontWeight: 'bold' },
  inputBox: {
    width: '100%',
    minWidth: 68,
    borderWidth: 1.3,
    borderColor: '#2563eb',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 17,
    color: '#111',
    textAlign: 'center',
    fontWeight: '600',
  },
  errorText: { color: '#ef4444', fontWeight: 'bold', marginBottom: 10 },
  buttonVerify: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 14,
    elevation: 2,
    marginTop: 8,
  },
  buttonVerifyText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.2 },
});

export default VerifyMnemonicScreen;
