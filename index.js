/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/router/Core.router';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
