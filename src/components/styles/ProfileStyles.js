import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
  profileScreenContainer: {
    height: 100 + '%',
    backgroundColor: '#000'
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
  },
  profileImageContainer: {
    width: 135,
    height: 135,
    borderRadius: 70,
    borderWidth: 0.5,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 133,
    height: 133,
    borderRadius: 70,
    borderWidth: 0.5,
    paddingBottom: 5,
  },
  profileImagePlaceholder: {
    width: 70 + '%',
    height: 70 + '%',
    margin: 20,
    bottom: 4,
    right: 1,
    paddingBottom: 5,
    tintColor: '#FFF'
  },
  usernameContainer: {
    width: 190,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 36,
    color: '#FFF',
    fontFamily: 'CacChampagne'
  },
  biographyContainer: {
    width: 180,
    height: 90,
    marginLeft: 20,
    marginTop: 5,
    color: '#FFF'
  },
  biographyText: {
    color: '#FFF'
  },
  followingButton: {
    color: '#FFF'
  },
  followingButtonContainer: {
    borderWidth: 0.5,
    borderColor: '#FFF',
    borderRadius: 25,
    marginLeft: 20,
    width: 70,
    alignItems: 'center'
  },
  imageGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  imageContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFF',
    height: 100,
    width: 33 + '%',
  },
  image: {
    width: 100 + '%',
    height: 100 + '%'
  }
});

export default ProfileStyles;