import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavbarStyles from '../styles/NavbarStyles';
import PropTypes from 'prop-types';
import { navbarIcons } from '../../assets/config';

const Navbar = props => {
  return (
    <View style={styles.iconBar}> 
      <TouchableOpacity onPress={() => props.onNavbarSelect('profile')}> 
        <Image  
          source={navbarIcons.profileIcon} 
          style={styles.iconFirst}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image  
          source={navbarIcons.uploadIcon} 
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onNavbarSelect('home')}>
        <Image  
          source={navbarIcons.homeIcon} 
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image  
          source={navbarIcons.searchIcon} 
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = NavbarStyles;

Navbar.propTypes = {
  onNavbarSelect: PropTypes.func.isRequired
}

export default Navbar;