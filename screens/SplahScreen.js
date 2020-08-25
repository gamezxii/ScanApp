import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplahScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/LogoMakr_0nyISP.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Animatable.Text
          style={styles.textlower}
          animation="fadeInUpBig"
          duraton="3000">
          Scan App
        </Animatable.Text>
      </View>
    </View>
  );
};

export default SplahScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00acee',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height,
  },
  textlogo: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  textlower: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
