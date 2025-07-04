import React from 'react';
import { Image } from 'react-native';

const icons = {
  home: require('../assets/MenuLogo/home.png'),
  activity: require('../assets/MenuLogo/activity.png'),
  dapps: require('../assets/MenuLogo/dapps.png'),
  swap: require('../assets/MenuLogo/swap.png'),
  settings: require('../assets/MenuLogo/settings.png'),
};

const MenuIcon = ({ name, focused, size = 24 }) => (
  <Image
    source={icons[name]}
    style={{
      width: size,
      height: size,
      opacity: focused ? 1 : 0.45,
      tintColor: focused ? '#2563eb' : '#a3aed6',
      resizeMode: 'contain',
    }}
  />
);

export default MenuIcon;
