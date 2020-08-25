import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Drawer,
  TouchableRipple,
  Text,
  Switch,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './components/context';

const DrawerContent = (props) => {
  const {toggleTheme} = React.useContext(AuthContext);
  const paperTheme = useTheme();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* section */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="qrcode-scan" color={color} size={size} />
              )}
              label="ScanX"
              onPress={() => {
                props.navigation.navigate('ScanX');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="qrcode-scan" color={color} size={size} />
              )}
              label="ScanY"
              onPress={() => {
                props.navigation.navigate('ScanY');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="qrcode-scan" color={color} size={size} />
              )}
              label="ScanZ"
              onPress={() => props.navigation.navigate('ScanZ')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="content-save-edit" color={color} size={size} />
              )}
              label="คืนสิทธิ์"
              onPress={() => props.navigation.navigate('Edits')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="newspaper-variant-outline"
                  color={color}
                  size={size}
                />
              )}
              label="รายงาน"
              onPress={() => props.navigation.navigate('Reports')}
            />
          </Drawer.Section>
          {/* section */}
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label=" Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section> */}
    </View>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
