import { StyleSheet } from 'react-native';

const LaunchStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titleText: {
    fontFamily: "Infinite_Stroke_Cond",
    fontSize: 60,
    
    paddingBottom: 180,
    color: '#fff'
  },
  button: {
    backgroundColor: '#3195F3', // the same color as actual instagram login buttons
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center'
  }
})

export default LaunchStyles;