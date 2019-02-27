import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';

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
    const username = this.props.navigation.getParam('username', 'user');
    return (
      <View style = {{backgroundColor: 'black', paddingTop:30, width: 100 + '%', height: 100 + '%'}}>
        <View style={styles.container}>
          <Navbar onNavbarSelect={this.onNavbarSelect} />
          <Text style={{margin: 10}}>Hello {username}!</Text>
        </View>
      </View>
    );
  }
};

const styles = MainStyles;

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default MainScreen;