import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { photoScreenIcons } from '../../assets/config';

// postgres query imports
import { incrementLikes, addComment, getComments, getHashtags, updateCaption } from '../../database/Image';
import { getUser } from '../../database/User';

/// custom component imports
import Navbar from '../common/Navbar';
import DialogInput from 'react-native-dialog-input';

class PhotoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageInfo: props.navigation.getParam('imageInfo', 'oops'),
      username: props.navigation.getParam('username', 'user'),
      numLikes: 0,
      screenWidth: Dimensions.get("window").width, // return the width of the current device
      liked: false,
      comments: [], // array of strings
      isCommentDialogVisible: false,
      isCaptionDialogVisible: false,
      fullCaption: ''
    };
  }

  async componentDidMount() {
    let numLikes = this.state.imageInfo.numLikes;
    let comments = await getComments(this.state.imageInfo.imageid);
    this.buildCaption(this.state.imageInfo.caption);
    this.setState({ numLikes: numLikes, comments: comments });
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

  toggleCommentDialogVisibility = () => {
    this.setState({ isCommentDialogVisible: !this.state.isCommentDialogVisible });
  }

  toggleCaptionDialogVisibility = () => {
    this.setState({ isCaptionDialogVisible: !this.state.isCaptionDialogVisible });
  }

  addComment = async (comment) => {
    let imageID = this.state.imageInfo.imageid;
    let currentUser = await getUser(this.state.username);

    await addComment(imageID, currentUser.userid, comment);

    let newComments = this.state.comments;
    newComments.push({ comment_text: comment, username: currentUser.username });

    this.setState({ 
      isCommentDialogVisible: !this.state.isCommentDialogVisible,
      comments: newComments 
    });
  }

  addCaption = async (caption) => {
    let imageID = this.state.imageInfo.imageid;
    
    // update the caption in postgres
    await updateCaption(caption, imageID);

    this.setState({ fullCaption: caption });
  }

  // construct the full caption with the hashtags
  buildCaption = async (baseCaption) => {
    let hashtags = await getHashtags(this.state.imageInfo.imageid);

    // create an array which will be joined to string
    let captionBuilder = []; 
    for (let hashtag of hashtags) 
      captionBuilder.push('#' + hashtag);

    captionBuilder.push(baseCaption);

    let fullCaption = captionBuilder.join(' ');
    this.setState({ fullCaption });
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
        navigate('Home', { username: this.state.username });
        break;
      default:
        console.log('navbar selection error');
        break;
    }
  }


  render() {
    const heartIconColor = (this.state.liked) ? "rgb(252, 61, 57)" : null;

    return (
      <ScrollView style={styles.mainWrapper}>
        <Navbar 
          onNavbarSelect={this.onNavbarSelect}
          currentUsername={this.state.username}
        />
        <View style={styles.userBar}>
          <View style={{ flexDirection: "row", alignItems: "center" }} >
            <Image style={styles.userPic}
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

          <TouchableHighlight onPress={() => this.toggleCommentDialogVisibility()} >         
            <Image style={[styles.icon, { height: 36, width: 36 }]}
              source={photoScreenIcons.commentIcon} />
          </TouchableHighlight>   

          <Image resizeMode="stretch"
            style={[styles.icon, { height: 50, width: 40 }]}
            source={photoScreenIcons.arrowIcon} 
          />
          <View style={styles.likeCounter}>
            <Text style={{ paddingLeft: 5 }}>{this.state.numLikes} Likes</Text>
          </View>
        </View>
          
        {
          this.state.username === this.state.imageInfo.poster 
          ? <TouchableOpacity 
              style={styles.captionContainer} 
              onPress={() => this.toggleCaptionDialogVisibility()}
            >
              <Text>{this.state.fullCaption}</Text>
            </TouchableOpacity>
          : <View style={styles.captionContainer}>
              <Text>{this.state.fullCaption}</Text>
            </View>
        }

        <View style={styles.commentsPanel}>
          {this.state.comments.map((comment, key) => {
            return (
              <View style={styles.commentRow} key={key}>
                <View style={styles.commentOwner}>
                  <Text>{comment.username}</Text>
                </View>
                <View style={styles.commentText}>
                  <Text>{comment.comment_text}</Text>
                </View>
              </View>
            );
          })}
        </View>
        
        <DialogInput isDialogVisible={this.state.isCommentDialogVisible}
          title={"Add Comment"}
          message={"Say something about this photo"}
          hintInput={"Type Here"}
          submitInput={(inputText) => { this.addComment(inputText) }}
          closeDialog={() => this.toggleCommentDialogVisibility()}>
        </DialogInput>

        <DialogInput isDialogVisible={this.state.isCaptionDialogVisible}
          title={"Add Caption"}
          message={"Say something about this photo"}
          hintInput={"Type Here"}
          submitInput={(inputText) => { this.addCaption(inputText) }}
          closeDialog={() => this.toggleCaptionDialogVisibility()}>
        </DialogInput>

      </ScrollView>
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

  likeCounter: {
    marginLeft: 160
  },

  captionContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10
  },

  commentsPanel: {
  },

  commentRow: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5
  },

  commentOwner: {
    marginLeft: 10,
    width: 50
  },

  commentText: {

  }

});

PhotoScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}


export default PhotoScreen;