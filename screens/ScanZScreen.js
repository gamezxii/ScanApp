import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import CardActivity from './components/CardActivity';
import Loader from './components/Loader';
import Toast from './components/Toast';

import {useSelector, useDispatch} from 'react-redux';
import * as scanzActions from './actions/scanz.action';
import * as scanUploadedActions from './actions/scanupload.action';

const ScanZScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const scanzReducer = useSelector(({scanzReducer}) => scanzReducer);
  const scanUploadedReducer = useSelector(
    ({scanUploadedReducer}) => scanUploadedReducer,
  );
  const [activity, setActivity] = React.useState('Z');
  const [visibleToast, setvisibleToast] = React.useState(false);
  React.useEffect(() => setvisibleToast(false), [visibleToast]);

  React.useEffect(() => {
    dispatch(scanzActions.feed());
  }, []);

  React.useEffect(() => {
    if (route.params?.post) {
      const {type, cusid, id, nameac} = route.params?.post;
      dispatch(scanUploadedActions.feed(type, cusid, id, nameac));
      setTimeout(() => {
        navigation.navigate('Scans', {
          type: activity,
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

  const feedData = scanzReducer.result
    ? scanzReducer.result.map((item) => ({
        ...item,
        onPress: () =>
          navigation && navigation.navigate('Scans', {type: activity, item}),
      }))
    : [];

  const renderFooter = () => {
    return scanzReducer.isFetching ? (
      <Loader loading={scanzReducer.isFetching} />
    ) : null;
  };

  const handleRefresh = () => {
    dispatch(scanzActions.refreshing());
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(scanzReducer.fulldata, (act) => {
      if (act.nameactivity.includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    dispatch(scanzActions.handleSearch(data));
  };
  return (
    <View style={styles.container}>
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
        refreshing={scanzReducer.isRefreshching}
      />
    </View>
  );
};

export default ScanZScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cardView: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#3333',
    flexDirection: 'row',
    height: 50,
    padding: 5,
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
    fontFamily: 'Sarabun-Bold',
  },
});
