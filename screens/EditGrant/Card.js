import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import * as returnRightActions from './edit.action';
import {useDispatch} from 'react-redux';

const Card = ({item}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const createThreeButtonAlert = (customerid, idactivity, time, nameactivity) =>
    Alert.alert(
      'คุณแน่ใจว่าต้องการยกเลิกรายการ ?',
      `รหัสลูกค้า : ${customerid} กิจกรรม :${nameactivity}`,
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('ยกเลิก'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: () =>
            dispatch(
              returnRightActions.uploaded(
                item.groupid_number,
                item.idactivity,
                item.time,
              ),
            ),
        },
      ],
      {cancelable: false},
    );
  return (
    <TouchableOpacity
      onPress={
        () =>
          createThreeButtonAlert(
            item.groupid_number,
            item.idactivity,
            item.time,
            item.nameactivity,
          )
        /*  */
      }>
      <View style={{padding: 10}}>
        <View style={[styles.cardContainer, {backgroundColor: colors.text}]}>
          <Text
            style={[
              styles.font,
              {
                fontWeight: 'bold',
                fontSize: 16,
                color: colors.background,
              },
            ]}>{`ID : ${item.groupid_number} `}</Text>
          <View style={styles.activityIdUse}>
            <Text
              style={[
                styles.font,
                {color: colors.background},
              ]}>{`รหัสบัตรที่ใช้ : ${item.idactivity} `}</Text>
            <Text style={styles.font}>{`บัตรที่ใช้ : ${item.usecard} `}</Text>
          </View>
          <View style={styles.activityIdplay}>
            <Text
              style={[
                styles.font,
                {color: colors.background},
              ]}>{`รหัสกิจกรรมที่เล่น : ${item.idactivity_play} `}</Text>
            <Text
              style={[
                styles.font,
                {color: colors.background},
              ]}>{`กิจกรรมที่เล่น : ${item.nameactivity} `}</Text>
          </View>
          <View style={styles.activitydate}>
            <Text
              style={[
                styles.font,
                {color: colors.background},
              ]}>{`วันที่ : ${item.date}`}</Text>
            <Text
              style={[
                styles.font,
                {color: colors.background},
              ]}>{`เวลา : ${item.time}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    borderRadius: 10,
  },
  activityIdUse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  activityIdplay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  activitydate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  font: {
    fontFamily: 'Sarabun-Bold',
  },
});
