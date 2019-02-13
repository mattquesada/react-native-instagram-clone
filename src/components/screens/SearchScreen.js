import React from 'react';
import { View, Text, Button } from 'react-native';
import SearchStyles from '../styles/SearchStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';

// sqlite query imports 
import { getAllUsernames, addFollow } from '../../database/User';

class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      foundUsernames: []
    };
    this.onNavbarSelect.bind(this);
  }

  componentDidMount() {
    getAllUsernames(this.state.username)
      .then( usernames => this.setState({foundUsernames: usernames}))
      .catch( err => console.log(err));
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
      default:
        console.log('navbar selection error');
        break;
    }
  }

  saveFollower = toFollowUsername => {
    let ownUsername = this.state.username;
    addFollow(ownUsername, toFollowUsername)
      .then(success => console.log(success))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <Navbar onNavbarSelect={this.onNavbarSelect} />
        <View>
          {this.state.foundUsernames.map(username => {
              return (
                <View style={styles.userPanel}>
                  <Text style={styles.usernameText}>
                    {username}
                  </Text>
                  <Button
                    title="Follow"
                    onPress={() => this.saveFollower(username)}
                    color='#3195F3'
                  />
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
};

const styles = SearchStyles;

SearchScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default SearchScreen;