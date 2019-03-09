import { StyleSheet } from 'react-native';

const SearchStyles = StyleSheet.create({
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
  },
  userPanel: {
    width: 100 + '%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  usernameText: {
    marginTop: 15,
    marginLeft: 20,
    flex: 1
  },
  tagPanel: {
    marginLeft: 20,
    marginTop: 10,
  },
  tagText: {
    color: 'black',
    fontSize: 20
  }
});

export default SearchStyles;