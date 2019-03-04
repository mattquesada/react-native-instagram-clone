import React from 'react';
import PushNotification from 'react-native-push-notification';

class PushController extends React.Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION', notification);
      }
    })
  }

  render() {
    return null;
  }
};

export default PushController;