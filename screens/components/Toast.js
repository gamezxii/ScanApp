import React from 'react';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';

const Toast = ({visible, message}) => {
  if (visible) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
    /* ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    ); */
    return null;
  }
  return null;
};

export default Toast;
