import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FollowingStyles from '../styles/FollowingStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';

// SQLite database imports
import { 
  getUser,
  getFollowing, 
  removeFollow, 
  getMultipleUsersByID
} from '../../database/User';

class FollowingScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      followedUsers: []
    };
    this.onNavbarSelect.bind(this);
  }

  componentDidMount() {
   this.getFollowedUsers();
  }

  getFollowedUsers = async () => {
    let ownUsername = this.state.username;
    let currentUser = await getUser(ownUsername);
    let followedUserIDs = await getFollowing(currentUser.userid);
    let followedUsers = await getMultipleUsersByID(followedUserIDs);

    this.setState({ followedUsers });
  }

  // load the selected screen when the navbar is pressed 
  onNavbarSelect = (selectedIcon) => {
    let { navigate } = this.props.navigation;
    switch (selectedIcon) {
      case 'home':
        navigate('Main', { username: this.state.username });
        break;
      case 'profile':
        navigate('Profile', { username: this.state.username });
        break;
      case 'search':
        navigate('Search', { username: this.state.username });
        break; 
      default:
        console.log('navbar selection error');
        break;
    }
  }

  removeFollow = async (followedUser) => {
    let currentUser = await getUser(this.state.username);
    try {
      let status = await removeFollow(currentUser.userid, followedUser.userid);
      this.getFollowedUsers();
    }
    catch { 
      err => console.log(err) 
    }
  }

  render() {
    return (
      <View style={styles.followingScreenContainer}>
        <Navbar 
          onNavbarSelect={this.onNavbarSelect} 
          currentUsername={this.state.username}
        />
        <View>
          {this.state.followedUsers.map((followedUser, key) => {
            return (
              <View style={styles.userPanel} key={key}>
                <Text style={styles.usernameText}>
                  {followedUser.username}
                </Text>
                <TouchableOpacity
                  onPress={() => this.removeFollow(followedUser)}
                  style={styles.unfollowButton}
                >
                  <Text>Unfollow</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = FollowingStyles;

FollowingScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default FollowingScreen;