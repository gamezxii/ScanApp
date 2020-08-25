import React from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import Toast from './components/Toast';
import CardActivity from './components/CardActivity';
import {useSelector, useDispatch} from 'react-redux';
import Loader from './components/Loader';
import * as scanxActions from './actions/scanx.action';
import * as scanUploadedActions from './actions/scanupload.action';
import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const scanxReducer = useSelector(({scanxReducer}) => scanxReducer);
  const scanUploadedReducer = useSelector(
    ({scanUploadedReducer}) => scanUploadedReducer,
  );
  const [typeActivity, setTypeActivity] = React.useState('X');
  const {colors} = useTheme();

  React.useEffect(() => {
    dispatch(scanxActions.feed());
  }, []);

  React.useEffect(() => {
    if (route.params?.post) {
      const {type, cusid, id, nameac} = route.params?.post;
      dispatch(scanUploadedActions.feed(type, cusid, id, nameac));
      setTimeout(() => {
        navigation.navigate('Scans', {
          type: typeActivity,
          item: {idactivity: id, nameactivity: nameac},
        });
      }, 2000);
    }
  }, [route.params?.post]);

  function renderItem({item}) {
    return <CardActivity {...item} />;
  }
  function keyExtractor(item) {
    return item.idactivity.toString();
  }

  const feedData = scanxReducer.result
    ? scanxReducer.result.map((item) => ({
        ...item,
        onPress: () =>
          navigation &&
          navigation.navigate('Scans', {type: typeActivity, item}),
      }))
    : [];

  const renderFooter = () => {
    return scanxReducer.isFetching ? (
      <Loader loading={scanxReducer.isFetching} />
    ) : null;
  };

  const handleRefresh = () => {
    dispatch(scanxActions.refreshing());
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(scanxReducer.fulldata, (act) => {
      if (act.nameactivity.includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    dispatch(scanxActions.handlesearch(data));
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Toast
        visible={scanUploadedReducer.isToast}
        message={scanUploadedReducer.result}
      />
      {scanUploadedReducer.isFetching ? (
        <Loader loading={scanUploadedReducer.isFetching} />
      ) : null}
      <View style={{borderBottomColor: '#bdbdbd', borderBottomWidth: 1}}>
        <View style={styles.searchSection}>
          <Icon
            style={styles.searchIcon}
            name="ios-search"
            size={15}
            color="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="ค้นหา"
            underlineColorAndroid="transparent"
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={scanxReducer.isRefreshching}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    margin: 10,
    borderRadius: 15,
    paddingLeft: 5,
  },
  searchIcon: {
    padding: 5,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    padding: 2,
    color: '#424242',
    height: 30,
    fontFamily: 'Sarabun-Bold'
  },
});
