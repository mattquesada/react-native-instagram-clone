import React from 'react';
import {
  View, 
  Button,
  ToastAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import RegisterStyles from '../styles/LoginStyles';
import formBuilder from 'tcomb-form-native';
import { getUser, addUser } from '../../database/User';


// Form object template
const RegisterForm = formBuilder.form.Form;

// User object to capture the inputs from the Login Form
const User = formBuilder.struct({
  email: formBuilder.String,
  username: formBuilder.String,
  password: formBuilder.String
});

class RegisterScreen extends React.Component {
 handleSubmit = async () => {
    const { navigate } = this.props.navigation;
    let user = this.refs.form.getValue(); // capture input from form

    //ToastAndroid.show(addUser(user), ToastAndroid.short); // add the user and display success
    let status = await addUser(user);
    console.log(user);

    let username = await getUser(user.email); // look up the username in the database
    console.log(username);
    
    navigate('Main', { username }); // transition to the MainScreen component
  }

  render() {
    return (
      <View style={styles.container}>
        <RegisterForm ref='form' type={User} />
        <Button title="Sign Up" onPress={this.handleSubmit} />
      </View>
    )
  }
};

const styles = RegisterStyles;

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default RegisterScreen;