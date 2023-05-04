import { Link, useNavigation } from 'expo-router'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { isNullOrUndefined, axs_kholbolt } from '../components'
import BarCodeScanners from '../components/barCodeScanner'
import TextUtga from '../components/textUtga'
import _ from 'lodash'
export default function BarCodeUnshuulakh(props) 
{
  const { barimt, setBarimt, tulburiinKhesegDuudakh } = props
  function qrKhariu(khariu) 
  {
       barimt.shireeniiDugaar = khariu
       setBarimt({...barimt})      
  }

  function khaakh() {
    barimt.shireeniiDugaar = undefined
    props.bottomSheetRef.current.close()
    setBarimt({...barimt})   
  }

  function tulburTulukh() {
    if (tulburiinKhesegDuudakh)
      tulburiinKhesegDuudakh()
  }
  return (
    <View>
        <BarCodeScanners  {...{qrKhariu}}/>
        {(isNullOrUndefined(barimt.shireeniiDugaar) || barimt.shireeniiDugaar === "") ?
            <View style = {{marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TextUtga style = {{fontSize: 18, fontWeight: '500'}}>QR код уншуулна уу!</TextUtga>
        </View> : null}
        <View style = {{flexDirection:'row', marginTop: 80}}>
            <TouchableOpacity 
                onPress={()=> khaakh()}
                style = {{backgroundColor:'#939495', alignItems:'center', borderRadius: 8, justifyContent:'center', padding:10, width: 130, marginRight: 8}}>
                <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>Хаах</TextUtga>
            </TouchableOpacity> 
            {/* <Link href={`/tulburTulukh`}  asChild> */}
                <TouchableOpacity onPress={()=> tulburTulukh()} style = {{backgroundColor:'#FF6839', alignItems:'center', borderRadius: 8, width: 130, justifyContent:'center'}}>
                    <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>Төлбөр төлөх</TextUtga>
                </TouchableOpacity> 
            {/* </Link> */}
        </View>
    </View>
  )
}
