import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import LaunchStyles from '../styles/LaunchStyles';
import { createTables } from '../../database/User';


class LaunchScreen extends React.Component {
  componentDidMount() {
    createTables() // create the database tables if they don't exist yet
    .then(success => console.log(success))
    .catch(err => console.log(err));
  }

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