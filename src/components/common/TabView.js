import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TabView = props => {
  return (
    <View style={styles.tabViewContainer}>
      {props.tabOptions.map((option, key) => {
        return (
          <TouchableOpacity 
            key={key}
            style={styles.tabContainer}
            onPress={() => props.optionPressed(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity> 
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },

  tabContainer: {
    marginLeft: 20,
    marginRight: 20
  },

  optionText: {
    color: 'grey'
  }
});

TabView.propTypes = {
  tabOptions: PropTypes.array.isRequired,
  optionPressed: PropTypes.func.isRequired
}

export default TabView;