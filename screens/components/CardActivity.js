import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

const CardActivity = (props) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => props.onPress(props.idactivity)}>
      <View style={[styles.cardView, {backgroundColor: colors.text}]}>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontFamily: 'Sarabun-Bold'}}>
            {props.idactivity}
          </Text>
        </View>
        <View
          style={{
            width: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.background, fontFamily: 'Sarabun-Bold'}}>
            {props.nameactivity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardActivity;

const styles = StyleSheet.create({
  cardView: {
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    height: 50,
    padding: 5,
  },
});
