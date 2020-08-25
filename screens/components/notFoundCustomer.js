import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';

const notFoundCustomer = ({visible}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  if (visible) {
    return (
      <View style={styles.notFoundContainer}>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'light-content'} />
        <Text style={[styles.notfound, {color: colors.text}]}>
          ไม่พบข้อมูล
        </Text>
      </View>
    );
  }
  return null;
};

export default notFoundCustomer;

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notfound: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
