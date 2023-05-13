import React, { useState } from 'react'
import { View,StyleSheet, Dimensions, TouchableOpacity, Keyboard, Image } from 'react-native'
import TextUtga from '../components/textUtga'
import {axs_kholbolt, isNullOrUndefined} from '../components'
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import TextTalbar from '../components/textTalbar'; 
import { useNavigation, useRouter } from 'expo-router';
import IconFeather from 'react-native-vector-icons/Feather'; 
import DismissKeyboardView from '../components/dismissKeyboardView';
import Svg, { Path } from 'react-native-svg';


export default function NevtrekhKhuudas() {
    const navigation = useNavigation()
    const router = useRouter()
    const insets = useSafeAreaInsets();
    const [utas, setUtas] = useState('')
    function kodAvya() { 
        if (isNullOrUndefined(utas) || utas === "")
        {
            alert('Дугаар оруулна уу')
            return
        }
        axs_kholbolt('api/khereglegchBurtgekh', {utas:utas}).then(khariu=>{
            navigation.navigate('kodAvakh', {utas}) 
        })
    }

    function onChangeText(utga) { 
        setUtas(utga)
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
                    fill="white"
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
            <View style = {{flex: 0.5,alignItems:'center', justifyContent:'center'}}>
                <View style = {styles.logo}>
                    <Image 
                        //style={}
                        style = {{height: 65, width: 65}}
                        source={require('../../zurag/phone.png')}
                    />
                </View>
                <TextUtga style = {{fontSize: 18, fontWeight:'bold', marginBottom: 8}}>Нэвтрэх</TextUtga>
                <TextUtga style = {{fontSize: 16, fontWeight: '200'}}>Утасны дугаараа ашиглан нэвтрэнэ үү</TextUtga>
            </View>
            <View style = {styles.content}>
                <TextTalbar 
                    value = {utas}
                    maxLength={8} 
                    selectTextOnFocus = {true} 
                    blurOnSubmit={false}
                    placeholderTextColor={'#cecece'}
                    keyboardType="numeric"
                    returnKeyType='done'
                    onSubmitEditing={() => {
                        Keyboard.dismiss()
                    }}
                    onChangeText={(utga)=> onChangeText(utga)}
                    style = {{borderWidth:1, paddingHorizontal: 15, borderColor:'#c1c1c1', height:50, borderRadius: 8}} 
                    placeholder = "Утасны дугаар"
                />
                <TouchableOpacity onPress={()=> kodAvya()} style ={styles.bottom}>
                    <TextUtga style = {styles.bottomText}>Код авах</TextUtga>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
    logo:{
        backgroundColor:'white', 
        marginBottom: 25, 
        width: 110, 
        height: 110, 
        borderRadius: 55, 
        alignItems:'center', 
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.09,
        shadowRadius: 6.00,
        elevation: 1,
    },
    content:{
        flex: 0.2, 
        marginHorizontal: 25, 
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
    bottomText:{
        color:'white',
        fontSize: 18,
        fontWeight:'500'
    },
    top: {},
    box: {
        backgroundColor: 'white',
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
    bottom:{
        backgroundColor:'#ff9c47', 
        borderRadius: 15,
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
})

