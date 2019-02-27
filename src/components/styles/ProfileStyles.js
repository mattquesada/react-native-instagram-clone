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
    margin: 20
  },
  usernameContainer: {
    width: 190,
    marginLeft: 20,
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  biographyContainer: {
    width: 190,
    height: 90,
    marginLeft: 0,
    marginTop: 0,
    color: '#fff'
  }
});

export default ProfileStyles;