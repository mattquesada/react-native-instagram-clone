import { StyleSheet } from 'react-native';

const PhotoStyles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    width: 100 + "%",
    height: 100 + "%",
    backgroundColor: '#000'
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
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },

  userPic: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    tintColor: '#FFF'
  },

  username: {
    color: '#FFF',
    marginLeft: 10
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
    marginLeft: 5,
    tintColor: '#FFF'
  },

  likeCounter: {
    marginLeft: 160
  },

  captionContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  captionText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  commentsPanel: { },

  commentRow: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: 'grey',
    paddingTop: 5,
    paddingBottom: 5,
    height: 50,
    alignItems: 'center'
  },

  commentOwner: {
    paddingLeft: 10,
    width: 50
  },

  commentTextContainer: {
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
  },

  commentText: {
    color: '#FFF'
  }

});

export default PhotoStyles;