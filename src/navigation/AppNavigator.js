import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabNavigator from './AppTabNavigator';

// Welcome Screens
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';

// Wallet Screens
import CreateWalletScreen from '../screens/Wallet/CreateWalletScreen';
import ImportWalletScreen from '../screens/Wallet/ImportWalletScreen';
import ImportWithPhraseScreen from '../screens/Wallet/ImportWithPhraseScreen';
import ImportWithPrivateKeyScreen from '../screens/Wallet/ImportWithPrivateKeyScreen';
import VerifyMnemonicScreen from '../screens/Wallet/VerifyMnemonicScreen';

import NetworkSettings from '../screens/NetworkSettings';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateWallet" component={CreateWalletScreen} options={{ title: "Create Wallet" }} />
      <Stack.Screen name="VerifyMnemonic" component={VerifyMnemonicScreen} options={{ title: "Verifikasi Mnemonic" }} />
      <Stack.Screen name="ImportWallet" component={ImportWalletScreen} options={{ title: "Import Wallet" }} />
      <Stack.Screen name="ImportWithPhrase" component={ImportWithPhraseScreen} options={{ title: "Import With Phrase" }} />
      <Stack.Screen name="ImportWithPrivateKey" component={ImportWithPrivateKeyScreen} options={{ title: "Import With Private Key" }} />
      {/* PENTING! MainTabs, ini yang jadi halaman utama setelah login */}
      <Stack.Screen name="MainTabs" component={AppTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NetworkSettings" component={NetworkSettings} />
    </Stack.Navigator>
  );
}
