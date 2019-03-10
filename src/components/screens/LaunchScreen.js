import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import LaunchStyles from '../styles/LaunchStyles';
import LaunchBackground from '../../assets/images/main-screen.png'

class LaunchScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={LaunchBackground} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Instagram
        </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
};

const styles = LaunchStyles;

LaunchScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LaunchScreen;