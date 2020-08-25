import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScanYScreen from './ScanYScreen';
import ScanZScreen from './ScanZScreen';
import ScanScreen from './ScanScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#009387',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const XScreenStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ScanX"
        component={HomeScreen}
        options={{
          title: 'สแกนบัตร X',
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor="#00938700"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
      <Stack.Screen name="Scans" component={ScanScreen} />
    </Stack.Navigator>
  );
};

const YScreenStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ScanY"
        component={ScanYScreen}
        options={{
          title: 'สแกนบัตร Y',
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor="#00938700"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
      <Stack.Screen name="Scans" component={ScanScreen} />
    </Stack.Navigator>
  );
};

const ZScreenStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ScanZ"
        component={ScanZScreen}
        options={{
          title: 'สแกนบัตร Z',
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor="#00938700"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
      <Stack.Screen name="Scans" component={ScanScreen} />
    </Stack.Navigator>
  );
};

export {XScreenStackNavigator, YScreenStackNavigator, ZScreenStackNavigator};
