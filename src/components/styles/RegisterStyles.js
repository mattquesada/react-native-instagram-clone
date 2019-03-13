import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
    marginBottom: 10
  },
  signupButton: {
    backgroundColor: '#1D83FF', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 4,
    bottom: 4,
    width: 193,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 66
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'JosefinSans_Regular',
    fontSize: 26,
    bottom: 3
  },
  hasAccount: {
    marginTop: 9,
    fontFamily: 'JosefinSans_Regular',
    textAlign: 'center',
    bottom: 0,
    marginBottom: 20,
    color: '#FFF',
    fontSize: 20
  }
});

export default RegisterStyles;