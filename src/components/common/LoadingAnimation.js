import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingAnimation = () => {
  return (
    <View style={{justifyContent: 'center'}}>
      <ActivityIndicator size='large' color='#0000ff' />
    </View>
  );
};

export default LoadingAnimation;