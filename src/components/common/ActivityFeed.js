import React from 'react';
import {View, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import ActivityFeedStyles from '../styles/ActivityFeedStyles';
import { profileIcons } from '../../assets/config';

const styles = ActivityFeedStyles;

const ActivityFeed = props => {
  return (
    <View>
     {props.feed.map((feedItem, key) => {
       return (
        <View key={key}>
          <View style={styles.userPanel}>
            <Image 
              source={profileIcons.userPlaceholder} 
              style={styles.profileIcon}  
            />
            <Text style={styles.username}>{feedItem.poster}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => props.onPhotoTap(key)}
            style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{uri: feedItem.imageurl}} 
            />
          </TouchableOpacity>
          {feedItem.caption
          ? 
            <View style={styles.captionBox}>
              <Text style={styles.captionText}>{feedItem.caption}</Text>
            </View>
          : <View></View>
          }
        </View>
       );
     })}
    </View>
  );
}

ActivityFeed.propTypes = {
  feed: PropTypes.array.isRequired,
  onPhotoTap: PropTypes.func.isRequired
}

export default ActivityFeed;