import { StyleSheet } from 'react-native';

const NavbarStyles = StyleSheet.create({
  iconBar: {
    height: 70,
    width: 100 + '%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(233, 233, 233)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  iconFirst: { // first icon in row should not not have margin 
    width: 40,
    height: 40,
    tintColor: "#FFF"
  },
  icon: {
    marginLeft: 40,
    width: 40,
    height: 40,
    tintColor: "#FFF"
  }
});

export default NavbarStyles;