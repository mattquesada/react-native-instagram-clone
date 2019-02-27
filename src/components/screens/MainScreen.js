import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';

// postgres fetchers
import { getImagesForMultipleUsers } from '../../database/Image';
import { getUser, getFollowing, getMultipleUsersByID } from '../../database/User';

// custom component imports
import Navbar from '../common/Navbar';
import LoadingAnimation from '../common/LoadingAnimation';
import ActivityFeed from '../common/ActivityFeed';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.getParam('username', 'user'),
      activityFeed: [],
      feedLoaded: false // toggles to true after we've finished fetching
    };
    this.onNavbarSelect.bind(this);
  }

  componentDidMount() {
    this.getActivityFeed();
  }

  getActivityFeed = async () => {
    let ownUsername = this.state.username;
    let currentUser = await getUser(ownUsername);

    // find all of the user ID's of users we are following
    let followedUserIDs = await getFollowing(currentUser.userid);

    // fetch user data belonging to the followed users 
    // and fetch all of the images belonging to them
    let followedUsers = await getMultipleUsersByID(followedUserIDs);
    let images = await getImagesForMultipleUsers(followedUserIDs);

    console.log(followedUsers);
    console.log(images);
    

    // finally, build the activity feed object to be rendered
    let activityFeed = this.constructActivityFeedArray(followedUsers, images);
    this.setState({ activityFeed, feedLoaded: true })
  }

  constructActivityFeedArray = (users, images) => {
    let activityFeed = [];
    images.forEach(image => {
      let imageOwner = users.find(user => user.userid === image.userid)
      activityFeed.push({
        imageurl: image.imageurl,
        poster: imageOwner.username,
        caption: image.caption,
      })
    });
    return activityFeed;
  }

  // load the selected screen when the navbar is pressed 
  onNavbarSelect = (selectedIcon) => {
    let { navigate } = this.props.navigation;
    switch (selectedIcon) {
      case 'profile':
        navigate('Profile', {username: this.state.username});
        break;
      case 'search':
        navigate('Search', {username: this.state.username});
        break;
      default:
        console.log('navbar selection error');
        break;
    }
  }

  render() {
    const username = this.props.navigation.getParam('username', 'user');
    return (
      <View style={styles.container}>
        <Navbar
          onNavbarSelect={this.onNavbarSelect}
          currentUsername={this.state.username}
        />
        {
          (this.state.feedLoaded)
          ? <ScrollView>
              <ActivityFeed feed={this.state.activityFeed} />
            </ScrollView>
          : <View>
              <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ margin: 10 }}>Hello {username}!</Text>
                <Text style={{ margin: 10 }}>Fetching your feed...</Text>
              </View>
              <LoadingAnimation />
            </View> 
        }
      </View>
    );
  }
};

const styles = MainStyles;

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default MainScreen;