import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import LoginStyles from '../styles/LoginStyles';
import formBuilder from 'tcomb-form-native';
import { getUser } from '../../database/User';

// Form object template
const LoginForm = formBuilder.form.Form;

// User object to capture the inputs from the Login Form
const User = formBuilder.struct({
  username: formBuilder.String,
  password: formBuilder.String
});

// Customize form
const FormOptions = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
}

// Alert message for invalid user
const raiseUsernameAlert = () => {
  return Alert.alert(
    'Error: username not found',
    'Please try again'
    [
      { text: 'OK' }
    ]
  );
};

class LoginScreen extends React.Component {
  handleSubmit = async () => {
    const { navigate } = this.props.navigation;
    let input = this.refs.form.getValue(); // capture form input

    getUser(input.username) // search for user in db
      .then(user => { // if found, load main page
        navigate('Main', { username: user.username });
      })
      .catch(err => { // if not found, display error 
        raiseUsernameAlert();
      });  
  }

  render() {
    return (  
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Text style={styles.banner}>Welcome Back</Text>
        </View>
        <View style={styles.loginForm}>
          <LoginForm ref='form' type={User} options={FormOptions} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Login"
            onPress={this.handleSubmit}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          <Text style={styles.notRegistered}>Not Registered?</Text>
        </View>
      </View>
    );
  }
};

const styles = LoginStyles;

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LoginScreen;