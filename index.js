/**
 * @format
 */

import 'react-native-get-random-values'; // <<< WAJIB BARIS PALING ATAS!
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
