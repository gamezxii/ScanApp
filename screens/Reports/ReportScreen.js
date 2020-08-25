import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {DataTable} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import Loader from '../components/Loader';
import {useSelector, useDispatch} from 'react-redux';
import * as reportActions from './report.action';
import ModalSelector from 'react-native-modal-selector';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from '../components/Toast';

const ReportScreen = () => {
  const dispatch = useDispatch();
  const reportReducer = useSelector(({reportReducer}) => reportReducer);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectType, setSelectType] = useState('');
  const [selectValue, setSelectValue] = useState('เลือกกิจกรรม');
  const data = [
    {key: 6137, label: 'X'},
    {key: 6138, label: 'Y'},
    {key: 6139, label: 'Z'},
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSearch = () => {
    let valdate = moment.utc(date).format('YYYY-MM-DD');
    if (valdate !== '' && selectType !== '') {
      dispatch(reportActions.search(valdate, valdate, selectType));
    } else {
      alert('โปรดเลือกกิจกรรม');
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: '#bdbdbd',
          borderBottomWidth: 1,
        }}>
        <View style={styles.searchSection}>
          <ModalSelector
            data={data}
            supportedOrientations={['landscape']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {
              setSelectType(option.key);
              setSelectValue(option.label);
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.font}>
                {selectValue}{' '}
                <Icon
                  size={15}
                  color="#000"
                  style={styles.Icon}
                  name="menu-down"
                />
              </Text>
            </TouchableOpacity>
          </ModalSelector>
          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              width: '50%',
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.font}>
              {moment.utc(date).format('DD-MM-YYYY').toString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSearch()}
            style={{
              width: '20%',
              height: 30,
              justifyContent: 'center',
              marginRight: 'auto',
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                marginRight: 4,
              }}>
              <Icons
                style={styles.searchIcon}
                size={15}
                color="#000"
                name="arrow-right-bold-outline"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.content}>
        <DataTable>
          <ScrollView>
            <DataTable.Header>
              <DataTable.Title styles={styles.font}>รายการ</DataTable.Title>
              <DataTable.Title style={styles.font} numeric>
                จำนวน
              </DataTable.Title>
            </DataTable.Header>
            {reportReducer.result ? (
              reportReducer.result.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.font}>{item[1]}</DataTable.Cell>
                  <DataTable.Cell style={styles.font} numeric>
                    {item[2]}
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <Toast
                visible={reportReducer.isToast}
                message={reportReducer.message}
              />
            )}
          </ScrollView>
        </DataTable>
        {reportReducer.isFetching ? (
          <Loader loading={reportReducer.isFetching} />
        ) : null}
      </View>
    </View>
  );
};

export default ReportScreen;

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
