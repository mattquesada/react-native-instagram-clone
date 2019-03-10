import React from 'react';
import {
  View, 
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import RegisterStyles from '../styles/RegisterStyles';
import formBuilder from 'tcomb-form-native';
import { getUser, addUser } from '../../database/User';


// Form object template
const RegisterForm = formBuilder.form.Form;

// User object to capture the inputs from the Login Form
const User = formBuilder.struct({
  'Full Name': formBuilder.String,
  'Email': formBuilder.String,
  'Username': formBuilder.String,
  'Password': formBuilder.String,
  'Confirm Password': formBuilder.String,
  'Birthday': formBuilder.String
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
    await addUser(input);

    let user = await getUser(input.username); // look up the username in the database

    navigate('Main', { username: user.username }); // transition to the MainScreen component
  }

  render() {
    return (
      <View style={styles.container}>
        <RegisterForm ref='form' type={User} options={FormOptions}/>
        <TouchableOpacity 
          title="Sign Up"
          onPress={this.handleSubmit} 
          style={styles.signupButton}  
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.hasAccount}>Already have an account?</Text>
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