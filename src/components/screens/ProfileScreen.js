import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  Button, 
  TouchableOpacity 
} from 'react-native';
import ProfileStyles from '../styles/ProfileStyles';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';

// custom component imports
import Navbar from '../common/Navbar';

// postgres query imports 
import { 
  getUser,
  updateBiography,
  updateProfileImage
} from '../../database/User';
import { getImages } from '../../database/Image';

import { profileIcons } from '../../assets/config';

import { ACCESS_KEY } from '../../config/config';

const uploadOptions = {
  title: 'Select a photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 0.5
};

const uploadToS3 = photoInfo => {
  const { uri, fileName, type } = photoInfo;

  const s3Address = 'https://ig-express-api.herokuapp.com/uploadImage';

  let data = new FormData();
  data.append('image', { uri, name: fileName, type });

  return fetch(s3Address, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'access-key': ACCESS_KEY
    },
    method: 'POST',
    body: data
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      biography: '',
      editingBiography: false,
      profileImageURL: "",
      images: [] // array of urls
    };
    this.onNavbarSelect.bind(this);
  }

  async componentDidMount() {
    let currentUser = await getUser(this.state.username); 
    let currentUserImages = await getImages(currentUser.userid);

    this.setState({
      biography: currentUser.biography,
      profileImageURL: currentUser.profileimageurl,
      images: currentUserImages
    });
  }

  // load the selected screen when the navbar is pressed 
  onNavbarSelect = (selectedIcon) => {
    let { navigate } = this.props.navigation;
    switch (selectedIcon) {
      case 'home':
        navigate('Main', { username: this.state.username });
        break;
      case 'search':
        navigate('Search', { username: this.state.username });
        break;
      default:
        console.log('navbar selection error');
        break;
    }
  }

  saveBiography = () => {
    let username = this.state.username; 
    let biography = this.state.biography
    
    this.setState({ editingBiography: false });

    updateBiography(username, biography)
      .then( status => {
        console.log(status);
      })
      .catch( err => {
        console.log(err);
      });
  }

  getFollowing = () => {
    let { navigate } = this.props.navigation;
    navigate('Following', { username: this.state.username });
  }

  handleImagePress = (index) => {
    let { navigate } = this.props.navigation;
    let imageInfo = this.state.images[index]; 
    imageInfo['poster'] = this.state.username;
    imageInfo['numLikes'] = imageInfo.likes;
    navigate('Photo', { 
      imageInfo: imageInfo,
      username: this.state.username
     });
  }

  handleImageUpload = (currentUsername) => {
    ImagePicker.showImagePicker(uploadOptions, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let awsResponse = await uploadToS3(response) // AWS returns the URL to the image
        let currentUser = await getUser(currentUsername);
        await updateProfileImage(currentUser.userid, awsResponse.imageUrl); // add the image URL to postgres
        this.setState({ profileImageURL: awsResponse.imageUrl })
      }
    });
  }

  render() {
    return (
      <View style={styles.profileScreenContainer}>
        <Navbar
          onNavbarSelect={this.onNavbarSelect}
          currentUsername={this.state.username}
        />
        <View style={styles.userInfoContainer}>
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={() => this.handleImageUpload(this.state.username)}
          >
            {this.state.profileImageURL 
              ? <Image source={{ uri: this.state.profileImageURL }} style={styles.profileImage} />
              : <Image source={profileIcons.userPlaceholder} style={styles.profileImagePlaceholder} />
            }
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => this.getFollowing()}
              style={styles.followingButtonContainer}
            >
              <Text style={styles.followingButton}>Following</Text>
            </TouchableOpacity>
            <Text style={styles.usernameContainer}>
              {this.state.username}
            </Text>
            {
              (this.state.editingBiography)
              ? <View>
                  <TextInput 
                    style={styles.biographyContainer}
                    placeholder="Type here to edit your bio!"
                    placeholderTextColor='#FFF'
                    onChangeText={(text) => this.setState({biography: text})}
                  />
                  <Button 
                    title="Save" 
                    onPress={() => this.saveBiography()}
                    color='#3195F3'
                  />
                </View>
              : <View>
                  <TouchableOpacity 
                    style={styles.biographyContainer}
                    onPress={() => this.setState({editingBiography: true})}
                  >
                    <Text style={styles.biographyText}>
                      {this.state.biography}
                    </Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
        <View style={styles.imageGrid}>
          {this.state.images.map((image, key) => {
            return (
              <TouchableOpacity 
                style={styles.imageContainer} key={key}
                onPress={() => this.handleImagePress(key)}
              >
                <Image
                  style={styles.image}
                  source={{ uri: image.imageurl }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = ProfileStyles;

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default ProfileScreen;

/**/
