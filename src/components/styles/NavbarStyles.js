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
    alignItems: 'center'
  },
  iconFirst: { // first icon in row should not not have margin 
    width: 40,
    height: 40
  },
  icon: {
    marginLeft: 40,
    width: 40,
    height: 40
  }
});

export default NavbarStyles;