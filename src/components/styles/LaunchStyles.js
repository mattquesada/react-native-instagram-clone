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
    color: '#FFF'
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
    backgroundColor: '#EBE0E0', // the same color as actual instagram login buttons
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    width: 210,
    height: 63
  },
  buttonText: {
    color: '#504C4C',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  }
})

export default LaunchStyles;