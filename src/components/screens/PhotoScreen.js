import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { photoScreenIcons } from '../../assets/config';

// postgres query imports
import { incrementLikes } from '../../database/Image';

class PhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageInfo: props.navigation.getParam('imageInfo', 'oops'),
      numLikes: 0,
      screenWidth: Dimensions.get("window").width, // return the width of the current device
      liked: false
    };
  }

  async likeToggled() {
    let numLikes = this.state.numLikes + 1;
    this.setState({
      liked: !this.state.liked,
      numLikes: numLikes
    });
    let status = await incrementLikes(this.state.imageInfo.imageid);
    console.log(status);
  }

  componentDidMount() {
    numLikes = this.state.imageInfo.numLikes;
    this.setState({ numLikes: numLikes });
  }

  render() {
    const heartIconColor = (this.state.liked) ? "rgb(252, 61, 57)" : null;

    return (
      <View style = {{backgroundColor: 'black', paddingTop:30, width: 100 + '%', height: 100 + '%'}}>
        <View style={styles.mainWrapper}>
          <View style={styles.userBar}>
            <View style={{ flexDirection: "row", alignItems: "center" }} >
              <Image style={styles.userPic}
                source={{
                  uri:
                    "https://i.pinimg.com/736x/fa/3f/13/fa3f13c259c27d7e0f7c79a2e5b157ee--outfits-with-black-converse-converse-fashion.jpg"
                }}
              />
              <Text style={{ marginLeft: 10 }}>{this.state.imageInfo.poster}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 28 }}>...</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.likeToggled();
            }}
          >
            <Image style={{ marginTop: 10, width: this.state.screenWidth, height: 400 }}
              source={{
                uri: this.state.imageInfo.imageurl
              }}
            />
          </TouchableOpacity>
          <View style={styles.iconBar}>
            <Image style={[styles.icon, { height: 40, width: 40, tintColor: heartIconColor }]}
              source={photoScreenIcons.heartIcon} />

            <Image style={[styles.icon, { height: 36, width: 36 }]}
              source={photoScreenIcons.commentIcon} />

            <Image resizeMode="stretch"
              style={[styles.icon, { height: 50, width: 40 }]}
              source={photoScreenIcons.arrowIcon} />
          </View>
          <View style={styles.iconBar}>
            <Image style={[styles.icon, { height: 30, width: 30 }]}
              source={photoScreenIcons.heartIcon}
            />
            <Text style={{ paddingLeft: 5 }}>{this.state.numLikes} Likes</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%"
  },

  tempNav: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(250, 250, 250)",
    borderBottomColor: "rgb(233, 233, 233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  },

  userBar: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },

  userPic: {
    height: 40,
    width: 40,
    borderRadius: 20
  },

  iconBar: {
    height: 50,
    width: 100 + "%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgb(233, 233, 233)",
    flexDirection: "row",
    alignItems: "center"
  },

  icon: {
    marginLeft: 5
  },
});

PhotoScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}


export default PhotoScreen;