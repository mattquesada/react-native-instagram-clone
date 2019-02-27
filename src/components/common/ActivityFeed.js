import React from 'react';
import {View, Text, Image } from 'react-native';
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
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image}
              source={{uri: feedItem.imageurl}} 
            />
          </View>
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
  feed: PropTypes.array.isRequired
}

export default ActivityFeed;