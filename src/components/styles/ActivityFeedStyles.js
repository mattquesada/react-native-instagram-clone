import { StyleSheet } from 'react-native';

const ActivityFeedStyles = StyleSheet.create({
  userPanel: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  profileIcon: {
    height: 40,
    width: 40,
    borderColor: '#FFF',
    borderRadius: 70,
    borderWidth: 0.5,
  },
  profileIconPlaceholder: {
    height: 40,
    width: 40,
    tintColor: '#FFF'
  },
  username: {
    color: '#FFF',
    marginLeft: 20,
    fontSize: 20,
  },
  imageContainer: {
    height: 300,
    width: 95 + '%',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  image: {
    width: 100 + '%',
    height: 100 + '%'
  },
  captionBox: {
    width: 95 + '%',
    height: 55,
    paddingLeft: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#FFF',
  },
  captionText: {
    color: '#FFF',
    fontSize: 20
  }
});

export default ActivityFeedStyles;