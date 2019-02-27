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

// Customize form
const FormOptions = {
  fields: {
    password: {
      secureTextEntry: true
    }
  }
}

class RegisterScreen extends React.Component {
  
  handleSubmit = async () => {
    const { navigate } = this.props.navigation;
    let input = this.refs.form.getValue(); // capture input from form
    
    // create new user row in the users table
    let status = await addUser(input);
    console.log(status);

    let user = await getUser(input.username); // look up the username in the database

    navigate('Main', { username: user.username }); // transition to the MainScreen component
  }

  render() {
    return (
      <View style = {{backgroundColor: 'black', paddingTop:30, width: 100 + '%', height: 100 + '%'}}>
        <View style={styles.container}>
          <RegisterForm ref='form' type={User} options={FormOptions}/>
          <Button title="Sign Up" onPress={this.handleSubmit} />
        </View>
      </View>
    )
  }
};

const styles = RegisterStyles;

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default RegisterScreen;