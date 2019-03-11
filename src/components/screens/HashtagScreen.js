import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';

// style imports -> because this component essentially does the same
// thing as MainScreen, we can reuse the same styles
import MainStyles from '../styles/MainStyles';

// custom component imports
import NavBar from '../common/Navbar';
import LoadingAnimation from '../common/LoadingAnimation';
import ActivityFeed from '../common/ActivityFeed';

// postgres query imports
import { getImagesByHashtag } from '../../database/Image';

class HashtagScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtagInfo: props.navigation.getParam('hashtag', null),
      username: props.navigation.getParam('username', 'user'),
      images: [],
      feedLoaded: false, // toggles to true after we've finished fetching
    };
  }

  componentDidMount() {
    this.buildHashtagFeed(this.state.hashtagInfo.hashtag_text);
  }

  buildHashtagFeed = async (hashtag) => {
    let images = await getImagesByHashtag(hashtag);
    this.setState({ images, feedLoaded: !this.state.feedLoaded });
  }

  // load the selected screen when the navbar is pressed 
  onNavbarSelect = (selectedIcon) => {
    let { navigate } = this.props.navigation;
    switch (selectedIcon) {
      case 'profile':
        navigate('Profile', { username: this.state.username });
        break;
      case 'search':
        navigate('Search', { username: this.state.username });
        break;
      case 'home':
        navigate('Home', {username: this.state.username });
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
      imageInfo: this.state.images[index],
      username: this.state.username
    });
  }

  render() {
    const username = this.state.username;
    return (
      <View style={styles.container}>
        <NavBar
          onNavbarSelect={this.onNavbarSelect}
          currentUsername={this.state.username}
        />
        {
          (this.state.feedLoaded)
            ? 
            <ScrollView>
              <ActivityFeed
                feed={this.state.images}
                onPhotoTap={this.onPhotoTap}
              />
            </ScrollView>
            : 
            <View>
              <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ margin: 10 }}>Hello {username}!</Text>
                <Text style={{ margin: 10 }}>Fetching images for hashtag...</Text>
              </View>
              <LoadingAnimation />
            </View>
        }
      </View>
    )
  }
}

const styles = MainStyles;

HashtagScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HashtagScreen;