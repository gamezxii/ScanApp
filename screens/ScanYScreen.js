import React from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import Toast from './components/Toast';
import CardActivity from './components/CardActivity';
import {useDispatch, useSelector} from 'react-redux';
import * as scanyActions from './actions/scany.action';
import * as scanUploadActions from './actions/scanupload.action';
import Loader from './components/Loader';

const DetailScreen = ({route, navigation}) => {
  const [visibleToast, setvisibleToast] = React.useState(false);
  const [activity, setActivity] = React.useState('Y');

  const scanyReducer = useSelector(({scanyReducer}) => scanyReducer);
  const scanUploadedReducer = useSelector(
    ({scanUploadedReducer}) => scanUploadedReducer,
  );
  const dispath = useDispatch();

  React.useEffect(() => {
    dispath(scanyActions.feed());
  }, []);

  React.useEffect(() => {
    if (route.params?.post) {
      let {type, cusid, id, nameac} = route.params?.post;
      dispath(scanUploadActions.feed(type, cusid, id, nameac));
      setTimeout(() => {
        navigation.navigate('Scans', {
          type: activity,
          item: {idactivity: id, nameactivity: nameac},
        });
      }, 2000);
    }
  }, [route.params?.post]);

  React.useEffect(() => setvisibleToast(false), [visibleToast]);

  function renderItem({item}) {
    return <CardActivity {...item} />;
  }

  function keyExtractor(item) {
    return item.idactivity.toString();
  }

  const feedData = scanyReducer.result
    ? scanyReducer.result.map((item) => ({
        ...item,
        onPress: () =>
          navigation && navigation.push('Scans', {type: activity, item}),
      }))
    : [];

  const renderFooter = () => {
    return scanyReducer.isFetching ? (
      <Loader loading={scanyReducer.isFetching} />
    ) : null;
  };

  const handleRefresh = () => {
    dispath(scanyActions.refreshing());
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(scanyReducer.fulldata, (act) => {
      if (act.nameactivity.includes(formattedQuery)) {
        return true;
      }
      return false;
    });
    dispath(scanyActions.handleSearch(data));
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
        refreshing={scanyReducer.isRefreshching}
      />
    </View>
  );
};

export default DetailScreen;

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
    fontFamily: 'Sarabun-Bold',
  },
});
