import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TextUtga from './textUtga';
 

export default function BarCodeScanners(props) {
  const {qrKhariu} = props
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    qrKhariu(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <TextUtga style={{textAlign: 'center', color: '#cecece'}}>
            {'Камерын зөвшөөрөл тохируулна уу!'}
        </TextUtga>
  }
  if (hasPermission === false) {
    return <TextUtga style={{textAlign: 'center', color: '#cecece'}}>
            {'Камерын эрх байхгүй байна'}
        </TextUtga>
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={StyleSheet.absoluteFillObject}
        style={{ 
          height: 250,
          borderRadius:15,
          width: Dimensions.get('window').width * 0.8,
        }}
      />
      {scanned && <Button title={'Дахин уншуулах'} onPress={() => setScanned(false)} />}
    </View>
  );
}