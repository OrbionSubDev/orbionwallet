import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Welcome/HomeScreen';
import ActivityScreen from '../screens/Activity/ActivityScreen';
import DappsScreen from '../screens/Dapps/DappsScreen';
import SwapScreen from '../screens/Swap/SwapScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import MenuIcon from '../components/MenuIcon';

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#a3aed6',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: '#e5e7eb',
        height: 64,
        paddingBottom: 10,
        paddingTop: 6,
        elevation: 15,
      },
      tabBarIcon: ({ focused, color, size }) => (
        <MenuIcon name={route.name.toLowerCase()} focused={focused} size={25} />
      ),
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 3,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Activity" component={ActivityScreen} />
    <Tab.Screen name="Dapps" component={DappsScreen} />
    <Tab.Screen name="Swap" component={SwapScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default AppTabNavigator;
