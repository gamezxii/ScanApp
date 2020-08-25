import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Card from './Card';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from '../components/Toast';

import {useSelector, useDispatch} from 'react-redux';
import * as editActions from './edit.action';

const EditScreen = () => {
  const dispatch = useDispatch();
  const returnRightReducer = useSelector(
    ({returnRightReducer}) => returnRightReducer,
  );

  const [customerid, setCustomerid] = React.useState('');

  const handleSearch = () => {
    if (customerid !== '') {
      dispatch(editActions.feedData(customerid));
    } else {
      alert('กรุณากรอกข้อมูล');
    }
  };

  function renderItem({item}) {
    return <Card item={item} />;
  }

  function keyExtractor(item) {
    return item.id.toString();
  }

  const renderFooter = () => {
    return returnRightReducer.isFetching ? (
      <Loader loading={returnRightReducer.isFetching} />
    ) : null;
  };

  const pushData = returnRightReducer.result
    ? returnRightReducer.result.map((item) => ({
        ...item,
      }))
    : [];
  return (
    <View style={styles.container}>
      <Toast
        visible={returnRightReducer.isToast}
        message={returnRightReducer.message}
      />
      <View
        style={{
          borderBottomColor: '#bdbdbd',
          borderBottomWidth: 1,
        }}>
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
            onChangeText={(e) => setCustomerid(e)}
          />
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => handleSearch()}>
            <Icons
              style={styles.searchIcon}
              size={15}
              color="#000"
              name="arrow-right-bold-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={pushData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerGroup: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bdbdbd',
    margin: 10,
    borderRadius: 5,
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
