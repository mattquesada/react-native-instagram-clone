/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { AppState } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Import all screen components
import LaunchScreen from './src/components/screens/LaunchScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import RegisterScreen from './src/components/screens/RegisterScreen';
import MainScreen from './src/components/screens/MainScreen';
import ProfileScreen from './src/components/screens/ProfileScreen';
import SearchScreen from './src/components/screens/SearchScreen';
import FollowingScreen from './src/components/screens/FollowingScreen';
import PhotoScreen from './src/components/screens/PhotoScreen';

import PushController from './src/components/common/PushNotification';
import PushNotification from 'react-native-push-notification';


type Props = {};
class App extends React.Component<Props> {

  constructor() {
    super();
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = appState => {
    if (appState === 'background') {
      console.log('app is in background');
      PushNotification.localNotificationSchedule({
        message: 'My Notification Message',
        date: new Date(Date.now() + (5 * 1000))
      });
    }
  }

  render() {
    return <AppContainer />
  }
}

// Create mapping of screens
const Routes = createStackNavigator(
  {
    Launch: LaunchScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen,
    Profile: ProfileScreen,
    Search: SearchScreen,
    Following: FollowingScreen,
    Photo: PhotoScreen
  },
  {
    initialRouteName: 'Launch'
  }
);

const AppContainer = createAppContainer(Routes);

export default App;