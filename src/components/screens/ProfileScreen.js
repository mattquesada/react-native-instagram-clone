import React from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import ProfileStyles from '../styles/ProfileStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';

// sqlite query imports 
import { 
  getUser,
  updateBiography,
} from '../../database/User';

// picture imports 
import { profileIcons } from '../../assets/config';

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      biography: '',
      editingBiography: false,
    };
    this.onNavbarSelect.bind(this);
  }

  componentDidMount() {
    getUser(this.state.username) // fetch the biography for the user
      .then( user => {
        this.setState({biography: user.biography});
      })
      .catch( err => {
        console.log(err);
      })
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
    navigate('Followers', { username: this.state.username });
  }

  render() {
    return (
      <View style = {{backgroundColor: 'black', paddingTop:30, width: 100 + '%', height: 100 + '%'}}>

        <View>
          <Navbar onNavbarSelect={this.onNavbarSelect} />
          <View style={styles.userInfoContainer}>
            <TouchableOpacity style={styles.profileImageContainer}>
              <Image 
                source={profileIcons.userPlaceholder}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.usernameContainer}>
                {this.state.username}
              </Text>
              {
                (this.state.editingBiography)
                ? <View>
                    <TextInput 
                      style={styles.biographyContainer}
                      placeholder="Tap here to edit your bio!"
                      placeholderTextColor="#fff"
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
                      <Text style={{padding: 12, color: '#fff'}}>
                        {this.state.biography}
                      </Text>
                    </TouchableOpacity>
                  </View>
              }
            </View>
          </View>
            <View style={[{ width: "90%", margin: 10 }]}>
              <Button
                title="Following"
                onPress={() => this.getFollowing()}
                color='#3195F3'
              /> 
            </View>
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