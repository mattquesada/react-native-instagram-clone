import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import LaunchStyles from '../styles/LaunchStyles';
import { screens } from '../../assets/config'
import { createTables } from '../../database/Init';

class LaunchScreen extends React.Component {
  componentDidMount() {
    createTables() // create the database tables if they don't exist yet
    .then(success => console.log(success))
    .catch(err => console.log(err));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={screens.MainScreen} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Instagram
          </Text>  

          <Image source={screens.logo} style={{bottom: 70, alignSelf: 'center', flex: 0, width: '27.13%', height: '18.5%'}}>
          </Image>

          <TouchableOpacity style={styles.button} onPress={ () => navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ () => navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>


    )
  }
};

const styles = LaunchStyles;

LaunchScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LaunchScreen;