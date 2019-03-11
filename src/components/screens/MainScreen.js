import React from 'react';
import { View, Text, ScrollView, AppState } from 'react-native';
import PropTypes from 'prop-types';
import MainStyles from '../styles/MainStyles';

// postgres fetchers
import { getImagesForMultipleUsers, countLikes } from '../../database/Image';
import { getUser, getFollowing, getMultipleUsersByID, countFollowers } from '../../database/User';

// Enable push notifications
import PushNotification from 'react-native-push-notification';

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
      feedLoaded: false, // toggles to true after we've finished fetching
      appState: AppState.currentState,
      currentStats: {  
        numLikes: 0,
        numFollowers: 0,
        //numComments: 0,
      }
    };
    this.onNavbarSelect.bind(this);
    this.onPhotoTap.bind(this);
  }

  componentDidMount() {
    this.getActivityFeed();
    this.getInitialStats(this.state.username);
    AppState.addEventListener('change', this._handleAppStateChange);
    this.interval = setInterval(() => this.checkForUpdates(this.state.username), 5000); // check for updates every 5 seconds
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    clearInterval(this.interval);
  }

  _handleAppStateChange = appState => {
    if (appState === 'background') { /* TODO */ }
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

    // finally, build the activity feed object to be rendered
    let activityFeed = this.constructActivityFeedArray(followedUsers, images);
    this.setState({ activityFeed, feedLoaded: true });
  }

  constructActivityFeedArray = (users, images) => {
    let activityFeed = [];
    images.forEach(image => {
      let imageOwner = users.find(user => user.userid === image.userid)
      activityFeed.push({
        imageid: image.imageid,
        imageurl: image.imageurl,
        poster: imageOwner.username,
        caption: image.caption,
        numLikes: image.likes
      })
    });
    return activityFeed;
  }

  // get the initial number of followers, likes, and comments 
  getInitialStats = async (username) => {
    let currentUser = await getUser(username);
    let likesResponse = await countLikes(currentUser.userid);
    let followersResponse = await countFollowers(currentUser.userid);

    // TODO:
    // let totalComments = await countComments(currentUser.userid);

    let totalLikes = parseInt(likesResponse.sum);
    let totalFollowers = parseInt(followersResponse.count);
    this.setState({ currentStats: { numLikes: totalLikes, numFollowers: totalFollowers } });
  }

  // once the user has logged in successfully,
  // listen for updates to the current user's posts, followers, etc.
  checkForUpdates = async (username) => {
    if (!this.state.feedLoaded) return; // we haven't fetched the initial user state yet

    let currentUser = await getUser(username);
    let likesResponse = await countLikes(currentUser.userid);
    let followersResponse = await countFollowers(currentUser.userid);

    let totalLikes = parseInt(likesResponse.sum);
    let totalFollowers = parseInt(followersResponse.count);

    // TODO:
    // let totalComments = await countComments(currentUser.userid);

    if (totalLikes > this.state.currentStats.numLikes) {
      PushNotification.localNotificationSchedule({
        message: 'Someone liked your post, tap to see who!',
        date: new Date(Date.now() + (5 * 1000))
      });
    };

    if (totalFollowers > this.state.currentStats.numFollowers) {
      PushNotification.localNotificationSchedule({
        message: 'Someone new just followed you, tap to see who!',
        date: new Date(Date.now() + (5 * 1000))
      });
    }

    this.setState({ currentStats: { numLikes: totalLikes, numFollowers: totalFollowers } });
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

  // if a photo is tapped -> transition to the photo page
  onPhotoTap = (index) => {
    let { navigate } = this.props.navigation;
    navigate('Photo', {
      imageInfo: this.state.activityFeed[index],
      username: this.state.username
    });
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
              <ActivityFeed 
                feed={this.state.activityFeed}
                onPhotoTap={this.onPhotoTap}
               />
            </ScrollView>
          : <View>
              <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ margin: 10, color: '#FFF' }}>Hello {username}!</Text>
                <Text style={{ margin: 10, color: '#FFF' }}>Fetching your feed...</Text>
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