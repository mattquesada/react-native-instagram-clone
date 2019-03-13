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
    marginTop: 30,
    fontSize: 45,
    fontFamily: 'JosefsinSans_Regular',
    color: '#FFF'
  },
  loginForm: {
    marginTop: 10
  },
  buttonContainer: {
    alignItems: 'center'
  },
  loginButton: {
    backgroundColor: '#1D83FF', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    bottom: 50,
    marginTop: 60,
    width: 210,
    height: 63
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'JosefinSans_Regular'
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