import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import SearchStyles from '../styles/SearchStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';

// sqlite query imports 
import { getAllUsers, addFollow } from '../../database/User';

class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      foundUsernames: [],
      searchText: ''
    };
    this.onNavbarSelect.bind(this);
  }

  /*componentDidMount() {
    getAllUsers(this.state.username)
      .then( users => {
        let usernames = [];
        users.forEach(user => {
          if (this.state.username != user.username) // we don't want to display current user 
            usernames.push(user.username);          // on the search screen
        });
        this.setState({foundUsernames: usernames});
      })
      .catch( err => console.log(err));
  }*/

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

  findUsers = () => {
    // TODO - write search for users route
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
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder='search for users...'
            onChangeText={(text) => this.setState({ searchText: text })}
          />
          <Button
            title="Search"
            onPress={() => this.findUsers()}
            color='#3195F3'
          />
        </View>
        <View style={{marginTop: 5}}>
          {this.state.foundUsernames.map((username, key) => {
              return (
                <View style={styles.userPanel} key={key}>
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