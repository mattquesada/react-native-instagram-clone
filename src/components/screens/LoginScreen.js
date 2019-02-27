import React from 'react';
import {
  View,
  Button,
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
      <View style = {{backgroundColor: 'black', paddingTop:30, width: 100 + '%', height: 100 + '%'}}>
        <View style={styles.container}>
          <LoginForm ref='form' type={User} options={FormOptions} />
          <Button title="Login" onPress={this.handleSubmit} />
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