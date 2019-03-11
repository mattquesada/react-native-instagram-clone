import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50
  },
  signupButton: {
    backgroundColor: '#EBE0E0', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20,
    marginLeft: 20 + '%',
    width: 210,
    height: 63
  },
  buttonText: {
    color: '#504C4C',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  hasAccount: {
    marginTop: 30,
    marginBottom: 50,
    color: '#FFF',
    fontSize: 20
  }
});

export default RegisterStyles;