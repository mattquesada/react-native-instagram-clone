import React from 'react';
import {View, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import ActivityFeedStyles from '../styles/ActivityFeedStyles';

const styles = ActivityFeedStyles;

const ActivityFeed = props => {
  return (
    <View>
     {props.feed.map((feedItem, key) => {
       return (
        <View key={key}>
          <Text>{feedItem.poster}</Text>
          <TouchableOpacity 
            onPress={() => props.onPhotoTap(key)}
            style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{uri: feedItem.imageurl}} 
            />
          </TouchableOpacity>
          <View style={styles.captionBox}>
            <Text>{feedItem.caption}</Text>
          </View>
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