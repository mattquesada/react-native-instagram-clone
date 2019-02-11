import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import NavbarStyles from '../styles/NavbarStyles';
import PropTypes from 'prop-types';
//import mainImages from '../../assets/config';

import homeIcon from '../../assets/images/home.png';
import userIcon from '../../assets/images/user.png';
import uploadIcon from '../../assets/images/upload.png';
import searchIcon from '../../assets/images/search.png';

const Navbar = props => {
  return (
    <View style={styles.iconBar}>
      <TouchableHighlight >
        <Image source={userIcon} style={styles.iconFirst}/>
      </TouchableHighlight>
      <TouchableHighlight>
        <Image source={uploadIcon} style={styles.icon}/>
      </TouchableHighlight>
      <TouchableHighlight>
        <Image source={homeIcon} style={styles.icon}/>
      </TouchableHighlight>
      <TouchableHighlight>
        <Image source={searchIcon} style={styles.icon}/>
      </TouchableHighlight>
    </View>
  );
}

const styles = NavbarStyles;

Navbar.propTypes = {
  routes: PropTypes.array.isRequired // allows us to mount other screens from the navbar
}

export default Navbar;