import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';
import * as databaseIO from '../../database/User';

import { Platform } from 'react-native';
// custom component imports
import Navbar from '../common/Navbar';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user')
    };
    this.onNavbarSelect.bind(this);
  }

  // load the selected screen when the navbar is pressed
  onNavbarSelect = (selectedIcon) => {
    let { navigate } = this.props.navigation;
    switch (selectedIcon) {
      case 'profile':
        navigate('Profile', {username: this.state.username});
        break;
      case 'search':
        navigate('Search', {username: this.state.username});
        break;
      default:
        console.log('navbar selection error');
        break;
    }
  }

  render() {
    const user = this.props.navigation.getParam('username', 'user');
    //let userInfo = databaseIO.getUser(username);


    return (
      <View style={styles.container}>
        <Navbar onNavbarSelect={this.onNavbarSelect} />
        <Text style={{margin: 10}}>Hello {user.username} !</Text>
      </View>
    );
  }
};

const styles = MainStyles;

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default MainScreen;
