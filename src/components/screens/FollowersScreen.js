import React from 'react';
import { View, Text, Button } from 'react-native';
import FollowersStyles from '../styles/FollowersStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';

// SQLite database imports
import { getFollowers, removeFollow } from '../../database/User';

class FollowersScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      followers: []
    };
    this.onNavbarSelect.bind(this);
  }

  componentDidMount() {
    getFollowers(this.state.username)
      .then( followers => this.setState({followers}) )
      .catch( err => console.log(err) );
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

  removeFollower = async (follower) => {
    let ownUsername = this.state.username;
    try {
      await removeFollow(ownUsername, follower);
      let followers = await getFollowers(ownUsername);
      await this.setState({followers});
    }
    catch { 
      err => console.log(err) 
    }
  }

  render() {
    return (
      <View>
        <Navbar onNavbarSelect={this.onNavbarSelect} />
        <View>
          {this.state.followers.map(follower => {
            return (
              <View style={styles.userPanel}>
                <Text style={styles.usernameText}>
                  {follower}
                </Text>
                <Button
                  title="Unfollow"
                  onPress={() => this.removeFollower(follower)}
                  color='#3195F3'
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = FollowersStyles;

FollowersScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default FollowersScreen;