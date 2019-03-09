import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TabView = props => {
  return (
    <View>
      {props.tabOptions.map((option, key) => {
        <TouchableOpacity 
          key={key}
          style={styles}
          onPress={() => props.optionPressed(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      })}
    </View>
  );
};

TabView.propTypes = {
  tabOptions: PropTypes.array.isRequired,
  optionPressed: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  tabOption: {
    display: 'flex',
    flexDirection: 'row',
  },

  optionText: {
    color: 'grey'
  }
})

export default TabView;