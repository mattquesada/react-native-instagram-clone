import React from 'react';
import {
  View,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import LoginStyles from '../styles/LoginStyles';
import formBuilder from 'tcomb-form-native';
import { getUser } from '../../database/User';

// Form object template
const LoginForm = formBuilder.form.Form;

// User object to capture the inputs from the Login Form
const User = formBuilder.struct({
  email: formBuilder.String,
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

class LoginScreen extends React.Component {
  handleSubmit = async () => {
    const { navigate } = this.props.navigation;
    let user = this.refs.form.getValue(); // capture input from form
    let username = await getUser(user.email); // look up the username in the database 
    navigate('Main', { username }); // transition to the MainScreen component
  }

  render() {
    return (  
      <View style={styles.container}>
        <LoginForm ref='form' type={User} options={FormOptions} />
        <Button title="Login" onPress={this.handleSubmit} />
      </View>
    );
  }
};

const styles = LoginStyles;

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LoginScreen;