import React from 'react';
import {
  View,
  Button
} from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import formBuilder from 'tcomb-form-native';

// Form object template
const LoginForm = formBuilder.form.Form;

// User object to capture the inputs from the Login Form
const User = formBuilder.struct({
  email: formBuilder.String,
  username: formBuilder.String,
  password: formBuilder.String
});

class LoginScreen extends React.Component {
  handleSubmit = () => {
    let user = this.refs.form.getValue(); // capture input from form
    console.log(JSON.stringify(user)); 
  }

  render() {
    return (  
      <View style={styles.container}>
        <LoginForm ref='form' type={User} />
        <Button title="Sign Up" onPress={this.handleSubmit} />
      </View>
    );
  }
};

const styles = LoginStyles;

export default LoginScreen;