import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';

// custom component imports
import Navbar from '../common/Navbar';

class MainScreen extends React.Component {
  render() {
    const username = this.props.navigation.getParam('username', 'user');
    return (
      <View style={styles.container}>
        <Navbar navigation={this.props.navigation} />
        <Text style={{margin: 10}}>Hello {username}!</Text>
      </View>
    );
  }
};

const styles = MainStyles;

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default MainScreen;