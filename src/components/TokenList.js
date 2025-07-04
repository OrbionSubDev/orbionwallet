import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

export default function TokenList({ tokens, onDelete, refreshControl }) {
  const renderRightActions = (item) => (
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={() => onDelete && onDelete(item)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    let displayValue = '$0.000000';
    if (typeof item.value === 'number' && !isNaN(item.value)) {
      displayValue = `$${item.value.toFixed(6)}`;
    } else if (item.value) {
      const valNum = Number(item.value);
      if (!isNaN(valNum)) displayValue = `$${valNum.toFixed(6)}`;
    }

    return (
      <Swipeable
        renderRightActions={() => item.isCustom ? renderRightActions(item) : null}
        enabled={item.isCustom}
      >
        <View style={styles.tokenRow}>
          <Image source={item.logo} style={styles.tokenLogo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tokenSymbol}>{item.symbol}</Text>
            <Text style={styles.tokenName}>{item.name}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.tokenBalance}>{item.balance}</Text>
            <Text style={styles.tokenValue}>{displayValue}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={tokens}
      keyExtractor={item => item.address || item.symbol}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 50 }}
      refreshControl={refreshControl}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 9,
    borderRadius: 10,
    elevation: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  tokenLogo: { width: 32, height: 32, marginRight: 12 },
  tokenSymbol: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  tokenName: { fontSize: 13, color: '#4b5563', opacity: 0.7 },
  tokenBalance: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  tokenValue: { fontSize: 13, color: '#2563eb', fontWeight: '700', marginTop: 2 },
  deleteBtn: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 10,
    marginVertical: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
