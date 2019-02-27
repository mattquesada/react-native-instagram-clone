import { StyleSheet } from 'react-native';

const ActivityFeedStyles = StyleSheet.create({
  userText: {
    marginLeft: 10,
    marginTop: 10
  },
  imageContainer: {
    height: 300,
    width: 100 + '%',
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  image: {
    width: 100 + '%',
    height: 100 + '%'
  },
  captionBox: {
    alignItems: 'center'
  }
});

export default ActivityFeedStyles;