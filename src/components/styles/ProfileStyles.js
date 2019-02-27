import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    marginLeft: 20,
    marginTop: 20,
  },
  profileImageContainer: {
    width: 135,
    height: 135,
    borderRadius: 70,
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 20,
    borderColor: '#fff',
  },
  profileImage: {
    width: 70 + '%',
    height: 70 + '%',
    margin: 20,
    bottom: 4,
    right: 1,
    paddingBottom: 5
  },
  usernameContainer: {
    width: 190,
    marginLeft: 20,
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 36,
    color: '#fff',
    fontFamily: 'cac_champagne'
  },
  biographyContainer: {
    width: 180,
    height: 90,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
    color: '#fff'
  }
});

export default ProfileStyles;