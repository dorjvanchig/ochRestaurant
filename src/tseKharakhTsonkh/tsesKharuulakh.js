import { useState, useEffect } from "react"
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { formatNumber, isNullOrUndefined, axs_kholbolt, sagsniiMedeelelAvya } from '../components';
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

    function avsanBaraagTulgakh() {
      let baraa = global.buteegdekhuunSags
      let butsakhToo = 0
      if (!isNullOrUndefined(baraa) && baraa.length > 0){
        let oldsonBaraa = baraa.find(a=> a.baarKodniiKhoch === ugugdluud.baarKodniiKhoch)
        if (!isNullOrUndefined(oldsonBaraa))
          butsakhToo = baraa.find(a=> a.baarKodniiKhoch === ugugdluud.baarKodniiKhoch)?.too
      }
      return butsakhToo
    }

    return (bool ? 
      <View 
        key={muriinDugaar}
        style = {[styles.zadargaa]} 
      >      
        {avsanBaraagTulgakh() !== 0 &&
        <View 
            style = {styles.badge}>
            <TextUtga style = {{color:'white', fontWeight:'bold', fontSize: 14}}>{avsanBaraagTulgakh()}</TextUtga>
        </View>}
        <TouchableOpacity 
          onPress={()=> buteegdekhuunDelgerengui(ugugdluud)}>
          <Image
              style={styles.logo}
              source={{uri:ugugdluud.zurag}}
              loadingIndicatorSource = {require('../../zurag/cropped-placeholder.jpg')}
          /> 
        </TouchableOpacity>
        <View 
            style = {styles.menuText}
          >
          <TextUtga 
            ellipsizeMode='tail' 
            numberOfLines={2}  
            style = {styles.textNer}>
              {`${ugugdluud.baarKodniiNer}`}
          </TextUtga>
        </View>
        <TouchableOpacity 
          onPress = {()=> sagsruuNemekh(ugugdluud)}
          style = {styles.sagsNemekhTovch}
        >
          <TextUtga style = {{fontWeight: 'bold', fontSize: 18}}>{formatNumber(ugugdluud.negjUne)}₮</TextUtga>
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
    badge:{
      position:'absolute', 
      zIndex: 99999, 
      right:-8, 
      backgroundColor:'#ff1515', 
      width: 25, 
      height: 25, 
      alignItems:'center', 
      justifyContent:'center', 
      top:-5, 
      borderRadius:50
    },
    menuText:{
      paddingHorizontal: 5, 
      paddingVertical: 5, 
      flexDirection:'column', 
      alignItems:'center', 
      justifyContent:'center',
      height: 50
    },
    textNer:{
        fontWeight: '700', 
        color:'#565656',
        fontSize: 15,
        textTransform:'capitalize',
        flexWrap:'wrap-reverse'
    }, 
    sagsNemekhTovch:{
      flexDirection:'row',
      backgroundColor:'#f1f1f1',
      marginHorizontal: 15,
      paddingHorizontal: 10,
      height: 40,
      marginTop: 5,
      justifyContent:'space-between',
      alignItems:'center',
      borderRadius: 20
    },
    zadargaa:{ 
      flexDirection:'column',
      borderWidth:1,
      position:'relative',
      borderRadius:25, 
      height: 230,
      borderColor:'#ededed',
      backgroundColor:'white',
      shadowColor: '#171717',
      width: Dimensions.get('window').width / 2 - 9,
      marginRight: 6,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2, 
      marginTop: 8,
      padding:2
    },
    logo: {
      //width: Dimensions.get('screen').width-210,
      borderTopLeftRadius: 21,
      borderTopRightRadius: 21,
      borderRadius: 4,
      height: 120, 
    },   
  });