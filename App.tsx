import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ChainProvider } from './src/contexts/ChainContext';
import { WalletProvider } from './src/contexts/WalletContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Tambahin ini

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ChainProvider>
          <WalletProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </WalletProvider>
        </ChainProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
