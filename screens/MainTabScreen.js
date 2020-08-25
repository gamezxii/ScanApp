import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import ScanYScreen from './ScanYScreen';
import ScanZScreen from './ScanZScreen';
import ScanScreen from './ScanScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {
  XScreenStackNavigator,
  YScreenStackNavigator,
  ZScreenStackNavigator,
} from './StackNavigator';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const Details = createStackNavigator();
const ScanzStack = createStackNavigator();

const MainTabScreen = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="ScanX"
      activeColor={colors.text}
      barStyle={{backgroundColor: colors.background}}
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="ScanX"
        component={XScreenStackNavigator}
        options={{
          tabBarLabel: 'ScanX',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="qrcode-scan" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanY"
        component={YScreenStackNavigator}
        options={{
          tabBarLabel: 'ScanY',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="qrcode-scan" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanZ"
        component={ZScreenStackNavigator}
        options={{
          tabBarLabel: 'ScanZ',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="qrcode-scan" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

/* const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
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
    <HomeStack.Screen name="Scans" component={ScanScreen} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
  <Details.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Details.Screen
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
    <Details.Screen name="Scans" component={ScanScreen} />
  </Details.Navigator>
);

const ScanzStackSceen = ({navigation}) => (
  <ScanzStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ScanzStack.Screen
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
    <ScanzStack.Screen name="Scans" component={ScanScreen} />
  </ScanzStack.Navigator>
); */
