import { useRouter, useSearchParams } from 'expo-router';
import * as React from 'react';
import IconFeather from 'react-native-vector-icons/Feather'; 

import IconAntDesign from 'react-native-vector-icons/AntDesign'; 
import { StyleSheet, View, Alert, Dimensions, TouchableOpacity, Image } from 'react-native';
import { OTPInput } from 'react-native-verify-otp-inputs';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import TextUtga from '../components/textUtga';
import DismissKeyboardView from '../components/dismissKeyboardView';
import Svg, { Path } from 'react-native-svg'; 
import { axs_kholbolt, getStoreData, setStoreData } from '../components';

export default function KodOruulakh() {
    const utasniiDugaar = useSearchParams(); 
    const insets = useSafeAreaInsets();
    const router = useRouter() 
    const [opt, setOpt] = React.useState("")
    function nevterye(utga) {
        setOpt(utga)
        let param = {utas:utasniiDugaar.utas, password: utga} 
        axs_kholbolt('api/nevtrekh', param).then(khariu=>{
          param.token = khariu
          setStoreData('khereglegch', param).then(()=>{
            router.push('/')
          })
        })
    }
  return (
    <DismissKeyboardView>
    <View style = {{height:Dimensions.get('window').height, backgroundColor:'#f6f6f6'}}> 
    <View style={styles.top}>
        <View style={styles.box}>
          <Svg 
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320" 
          >
            <Path
              fill="#ff9c47"
              d='M0,224L80,192C160,160,320,96,480,96C640,96,800,160,960,165.3C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'
            />
          </Svg>
        </View>
      </View>
        <View style = {[styles.header, {top: insets.top}]}>
            <TouchableOpacity style ={styles.butsakh} onPress = {()=> router.back()}>
                <IconFeather name="arrow-left" size={25} color= "black"/>
            </TouchableOpacity>
        </View>
        <View style = {{flex:0.9, marginTop: 15}}>
              <View style = {{flex: 0.4,alignItems:'center', justifyContent:'center'}}>
                <View style = {{backgroundColor:'#eee8e8', marginBottom: 25, width: 110, height: 110, borderRadius: 55, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <IconAntDesign name='checkcircle' size={85} color = "#71dba3" style = {{borderRadius: 50}}/>
                    {/* <Image
                        //style={}
                        
                        source={require('../../zurag/background.jpg')}
                    /> */}
                </View>
                <TextUtga style = {{fontSize: 18, marginBottom: 8}}>Баталгаажуулах</TextUtga>
                <TextUtga style = {{
                    fontSize: 15, fontWeight: '200'
                }}>Таны утасны дугаарт ирсэн кодыг хийнэ үү.</TextUtga>
            </View>
            <View style = {styles.content}>
                <OTPInput
                  onSubmit={(otp) => {
                    nevterye(otp)
                  }}
                  pinCount={4}
                  boxSelectedStyle={styles.boxSelectedStyle}
                  boxStyle={styles.boxStyle}
                  digitStyle={styles.digitStyle}
                  variant="default"
                />
                <TouchableOpacity style ={styles.bottom} onPress= {()=> nevterye(opt)}>
                    <TextUtga style = {styles.bottomText}>Үргэлжлүүлэх</TextUtga>
                </TouchableOpacity>
            </View>
        </View> 
    </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }, 
  content:{
    flex: 0.3, 
    marginHorizontal: 18, 
    padding: 10,
    backgroundColor:'white', 
    justifyContent:'center',  
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.00,
    elevation: 5,
},
  top: {},
  box: {
    backgroundColor: '#ff9c47',
    opacity: 0.8,
    height: 80,
    shadowColor: "#adadad",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  bottomText:{
    color:'white',
    fontSize: 18,
    fontWeight:'500'
},
  boxSelectedStyle: {
    backgroundColor: '#f1f1f1', 
  },
  digitStyle: {
    color: 'black',
    fontWeight:'500'
  },
  boxStyle: {
    borderWidth:1,
    borderColor:'#ebebeb',
    borderRadius: 5,
    backgroundColor:'white',
  },
  bottom:{
    backgroundColor:'#ff9c47', 
    borderRadius: 8,
    height:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 15
},
  
  butsakh:{
    backgroundColor:'white',
    height:30,
    width: 35,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    position:'relative'
},
  header:{
    position:'absolute',  
    width:Dimensions.get('window').width - 10, 
    marginLeft: 5, 
    height: 35, 
    paddingHorizontal: 28,  
}
});