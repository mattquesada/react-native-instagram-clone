import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  TextInput,
  TouchableOpacity
 } from 'react-native';
import SearchStyles from '../styles/SearchStyles';
import PropTypes from 'prop-types';

// custom component imports
import Navbar from '../common/Navbar';
import TabView from '../common/TabView';

// sqlite query imports 
import { searchForUsers, getUser, addFollow } from '../../database/User';
import { searchHashtags } from '../../database/Image';

class SearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      foundUsers: [],
      foundTags: [],
      searchText: '',
      tabSelected: 'People'
    };
    this.onNavbarSelect.bind(this);
    this.onTabSelect.bind(this);
  }

  findUsers = () => {
    searchForUsers(this.state.searchText)
    .then(users => this.setState({foundUsers: users}))
    .catch(err => console.log(err));
  }

  findHashtags = () => {
    searchHashtags(this.state.searchText)
      .then(hashtags => this.setState({ foundTags: hashtags }))
      .catch(err => console.log(err));
  }

  saveFollow = async (toFollowUser) => {
    let ownUsername = this.state.username;
    let currentUser = await getUser(ownUsername);
    await addFollow(currentUser.userid, toFollowUser.userid);
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

  onTabSelect = (tab) => {
    this.setState({ tabSelected: tab });
  }

  onHashtagSelect = (hashtag) => {
    let { navigate } = this.props.navigation;
    navigate('HashtagFeed', { 
      hashtag,
      username: this.state.username 
    });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Navbar
          onNavbarSelect={this.onNavbarSelect}
          currentUsername={this.state.username}
        />
        <TabView
           tabOptions={['People', 'Tags']}
           optionPressed={this.onTabSelect}
        />
        {this.state.tabSelected === 'People' 
          ? 
          <View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='search for users...'
                placeholderTextColor='#FFF'
                onChangeText={(text) => this.setState({ searchText: text })}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.findUsers()}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 5 }}>
              {this.state.foundUsers.map((user, key) => {
                return (
                  <View style={styles.userPanel} key={key}>
                    <Text style={styles.usernameText}>
                      {user.username}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.saveFollow(user)}>
                      <Text>Follow</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
              }
            </ScrollView>
          </View>
        : 
          <View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='search for hashtags...'
                placeholderTextColor='#FFF'
                onChangeText={(text) => this.setState({ searchText: text })}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.findHashtags()}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 5 }}>
              {this.state.foundTags.map((hashtag, key) => {
                return (
                  <TouchableOpacity 
                    style={styles.tagPanel}
                    onPress={() => this.onHashtagSelect(hashtag)} 
                    key={key}
                  >
                    <Text style={styles.tagText}>
                      #{hashtag.hashtag_text}
                    </Text>
                    <Text style={styles.imageCount}>
                      {hashtag.count}
                    </Text>
                  </TouchableOpacity>
                );
              })
              }
            </ScrollView>
          </View>
        }
      </View>
    );
  }
};

const styles = SearchStyles;

SearchScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default SearchScreen;