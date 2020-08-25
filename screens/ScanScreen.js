import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from './components/Toast';

const ScanScreen = (props) => {
  const scannerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const {item} = props.route.params;
  const {type} = props.route.params;
  const [visibleToast, setvisibleToast] = React.useState(false);

  useEffect(() => {
    setvisibleToast(true);
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, []);

  //React.useEffect(() => setvisibleToast(false), [visibleToast]);

  const onSuccess = (result) => {
    setvisibleToast(false);
    let id = item.idactivity;
    let name = item.nameactivity;
    props.navigation.navigate(`Scan${type}`, {
      post: {type: type, cusid: result, id: id, nameac: name},
    });
  };

  const showScanner = () => {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        {isReady ? (
          <QRCodeScanner
            ref={scannerRef}
            showMarker
            onRead={(e) => onSuccess(e.data)}
            style={{flex: 1}}
          />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#FFF'}}>
              Loading...
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Toast visible={visibleToast} message={item.nameactivity} />
      {showScanner(props, scannerRef)}
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonTouchable: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fa4a4d',
  },
  viewcontentHeader: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dedede',
    borderRadius: 15,
  },
  contentheader: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
