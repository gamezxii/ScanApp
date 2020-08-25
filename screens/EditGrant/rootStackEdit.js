import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditScreen from './EditScreen';
const rootStackEdit = ({navigation}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Edits"
        component={EditScreen}
        options={{
          title: 'คืนสิทธิ์การสแกน',
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default rootStackEdit;
