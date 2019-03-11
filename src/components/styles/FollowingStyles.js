import { StyleSheet } from 'react-native';

const FollowingStyles = StyleSheet.create({
  followingScreenContainer: {
    height: 100 + '%',
    backgroundColor: '#000'
  },
  userPanel: {
    width: 100 + '%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  usernameText: {
    marginLeft: 20,
    flex: 1,
    color: '#FFF'
  },
  unfollowButton: {
    height: 30,
    width: 80,
    backgroundColor: '#EBE0E0',
    marginRight: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FollowingStyles;