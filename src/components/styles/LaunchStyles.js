import { StyleSheet } from 'react-native';

const LaunchStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 58,
    fontFamily: 'InfiniteStroke',
    color: '#F74C4E',
    textDecorationLine: 'underline'
  },
  logo: {
    marginTop: 20,
    width: 27.13 + '%',
    height: 18.5 + '%'
  },
  buttonContainer: {
    marginTop: 60
  },
  button: {
    backgroundColor: '#1D83FF', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    width: 140,
    height: 52
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'JosefinSans_Regular',
    textAlign: 'center',
    fontSize: 18,
  }
})

export default LaunchStyles;