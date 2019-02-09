import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';
import * as databaseIO from '../../database/User';

class MainScreen extends React.Component {
  render() {
    const username = this.props.navigation.getParam('username', 'user');
    const userID = databaseIO.getUsername(username)[0];
    return (
      <View style={styles.container}>
        <Text> Hello {username}! Your UserID is: {userID} </Text>
      </View>
    );
  }
};

const styles = MainStyles;

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default MainScreen;