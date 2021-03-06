import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
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
    borderColor: 'rgb(233, 233, 233)',
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
    fontWeight: 'bold'
  },
  biographyContainer: {
    width: 190,
    height: 90,
    marginLeft: 20,
    marginTop: 5,
  },
  imageGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 35,
    marginTop: 10
  },
  imageContainer: {
    backgroundColor: '#FFF',
    height: 100,
    width: 100,
  },
  image: {
    width: 100 + '%',
    height: 100 + '%'
  }
});

export default ProfileStyles;