import { StyleSheet } from 'react-native';

const SearchStyles = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000',
    height: 100 + '%'
  },
  textInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 190,
    height: 90,
    marginLeft: 20,
    marginTop: 5,
    color: '#FFF'
  },
  userPanel: {
    width: 100 + '%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  usernameText: {
    marginLeft: 20,
    flex: 1,
    color: '#FFF'
  },
  tagPanel: {
    marginLeft: 20,
    marginTop: 10,
  },
  tagText: {
    color: 'white',
    fontSize: 24
  },
  imageCount: {
    color: 'white',
    fontSize: 14
  },  
  button: {
    height: 30,
    width: 80,
    backgroundColor: '#EBE0E0',
    marginRight: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SearchStyles;