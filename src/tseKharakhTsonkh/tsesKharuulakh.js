import { useState, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { formatNumber, isNullOrUndefined, axs_kholbolt } from '../components';
import TextUtga from "../components/textUtga";
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'; 

export default function TsesKharuulakh(props) {
    const { ugugdul, buteegdekhuunDelgerengui, muriinDugaar, sagsruuNemekh, songosonBaiguullaga } = props
    const [ugugdluud, setUgugdluud] = useState(ugugdul)
    const [bool, setBool] = useState(ugugdul)

    useEffect(() => {
        zuragAvya()
    }, [ugugdul]);

    function zuragAvya() {
        let param = {baarKodniiKhoch: ugugdul.baarKodniiKhoch, baiguullagiinKhoch: songosonBaiguullaga?.baiguullagiinKhoch}
        axs_kholbolt('api/zuragAvya', param)
        .then(khariu =>{
            ugugdul.zurag = khariu
            setBool(true);
            setUgugdluud(ugugdul)
        })
    }

    return (bool ? <View 
        key={muriinDugaar}
        style = {[styles.zadargaa, {backgroundColor: ugugdluud.garakhBolomjtoiEsekh ? 'red': 'white'}]} 
      >
          
        <TouchableOpacity
          onPress = {()=> buteegdekhuunDelgerengui(ugugdluud)}
        >
          <Image
              style={styles.logo}
              source={{uri:ugugdluud.zurag}}
              loadingIndicatorSource = {require('../../zurag/cropped-placeholder.jpg')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress = {()=> buteegdekhuunDelgerengui(ugugdluud)}
          style = {{paddingHorizontal: 8, marginTop:5, height: 75, flex:1}}
        >
          <TextUtga ellipsizeMode='tail' numberOfLines={2}  style = {styles.textNer}>{`${ugugdluud.baarKodniiNer}`}</TextUtga>
          <TextUtga style = {{fontWeight: 'bold', fontSize: 18}}>{formatNumber(ugugdluud.une)}₮</TextUtga>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.plus} onPress = {()=> sagsruuNemekh(ugugdluud)}>
          <IconMaterial name="plus-circle-outline" size={25} color = "#3a8d82"/>
        </TouchableOpacity>
      </View> : <View/>)
}

const styles = StyleSheet.create({
    plus:{
        position:'absolute',
        right: 15,
        bottom:5,
    },
    textNer:{
        fontWeight: '400', 
        fontSize: 17,
        textTransform:'uppercase',
        flexWrap:'wrap-reverse'
    }, 
    zadargaa:{ 
      flexDirection:'row',
      borderWidth:1,
      position:'relative',
      borderRadius:10, 
      borderColor:'#ededed',
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      marginLeft:18,
      marginTop: 8
    },
    logo: {
      width: Dimensions.get('screen').width-210,
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
      height: 105,
    },   
  });