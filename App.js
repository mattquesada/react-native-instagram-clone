/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Import all screen components
import LaunchScreen from './src/components/screens/LaunchScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import RegisterScreen from './src/components/screens/RegisterScreen';
import MainScreen from './src/components/screens/MainScreen';

type Props = {};
class App extends React.Component<Props> {
  render() {
    return <AppContainer />;
  }
}

// Create mapping of screens
const Routes = createStackNavigator(
  {
    Launch: LaunchScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen
  },
  {
    initialRouteName: 'Launch'
  }
);

const AppContainer = createAppContainer(Routes);

export default App;