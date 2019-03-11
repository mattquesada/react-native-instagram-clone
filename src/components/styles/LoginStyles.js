import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#000',
    height: 100 + '%'
  }, 
  bannerContainer: {
    alignItems: 'center'
  },
  banner: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF'
  },
  loginForm: {
    marginTop: 30
  },
  buttonContainer: {
    alignItems: 'center'
  },
  loginButton: {
    backgroundColor: '#EBE0E0', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20,
    width: 210,
    height: 63
  },
  buttonText: {
    color: '#504C4C',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  optionsContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  forgotPassword: {
    fontSize: 20,
    color: '#FFF'
  },
  notRegistered: {
    fontSize: 20,
    marginTop: 20,
    color: '#FFF'
  }
});

export default LoginStyles;