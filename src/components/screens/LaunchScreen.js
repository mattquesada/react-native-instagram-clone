import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import LaunchStyles from '../styles/LaunchStyles';

class LaunchScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Instagram
        </Text>  
        <TouchableOpacity style={styles.button} onPress={ () => navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ () => navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = LaunchStyles;

LaunchScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LaunchScreen;