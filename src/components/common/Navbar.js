import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavbarStyles from '../styles/NavbarStyles';
import PropTypes from 'prop-types';
import { navbarIcons } from '../../assets/config';

import ImagePicker from 'react-native-image-picker';

const uploadOptions = {
  title: 'Select a photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 0.5
};

const handleImageUpload = () => {
  ImagePicker.showImagePicker(uploadOptions, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      uploadToS3(response);
    }
  });
}

const uploadToS3 = photoInfo => {
  const { uri, fileName, type } = photoInfo;

  //const s3Address = `https://ig-express-api.herokuapp.com/sign-s3?file-name=${fileName}&file-type=${type}`;
  const s3Address = 'http://localhost:5000/image-upload';

  let data = new FormData();
  data.append('image', { uri, name: fileName, type });
  
  return fetch(s3Address, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'access-key': 'beautiful-life-long-friends'
    },
    method: 'POST',
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

const Navbar = props => {
  return (
    <View style={styles.iconBar}> 
      <TouchableOpacity onPress={() => props.onNavbarSelect('profile')}> 
        <Image  
          source={navbarIcons.profileIcon} 
          style={styles.iconFirst}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleImageUpload()}>
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
      <TouchableOpacity onPress={() => props.onNavbarSelect('search')}>
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