import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/statusBar";
import RenderHtml from 'react-native-render-html';
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import { useRouter, Link, useSearchParams } from "expo-router";
import TooComponent from "../components/tooComponent";  
import { formatNumber, isNullOrUndefined, sagsniiMedeelelAvya } from "../components";
import { useEffect, useState } from "react";
import _ from 'lodash'
import { delgrenguiMedeelleesSagsruuNemekh } from "../components/shigtgee";
export default function DelgerenguiMedeelel() {
  const router = useRouter() 
  const songosonItem =  useSearchParams(); 
  console.log('songosonBaraa', songosonItem)
  const [songosonBaraa, setSongosonBaraa] = useState({})
  useEffect(()=> {
    let baraa = _.cloneDeep(songosonItem)
    let sagsBaraanuud = sagsniiMedeelelAvya().baraanuud 
    const tooAvya = sagsBaraanuud.find(a=> a.baarKodniiKhoch === baraa.baarKodniiKhoch)
    baraa.too  = isNullOrUndefined(tooAvya) ? 1 : tooAvya.too
    baraa.niitDun = baraa.too * baraa.une
    setSongosonBaraa({...baraa})
  }, [])

  function soligdsonTooAvya(too, turul) {
    songosonBaraa.too = too
    songosonBaraa.niitDun = too * songosonBaraa.une 
    setSongosonBaraa({...songosonBaraa})
  }

  function sagsruuNemekh() 
  {
    router.back()
    delgrenguiMedeelleesSagsruuNemekh(songosonBaraa)
  }
console.log('songosonBaraa.khoolniiDelgerengui', songosonBaraa.khoolniiDelgerengui)
  return (
    <View style={styles.container}>
        <CustomStatusBar/>
        <TouchableOpacity style = {styles.header} onPress={()=> router.back()}>
            <TouchableOpacity >
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>Тахиатай шөл</TextUtga>
        </TouchableOpacity>
        <ScrollView style = {{flex:1}}>
            <View style ={styles.location}>
                <Image
                    style={styles.logo}
                    source={{uri:songosonBaraa.zurag}}
                    loadingIndicatorSource = {require('../../zurag/cropped-placeholder.jpg')}
                />
            </View> 
            <View style = {styles.medeelel}>
                <View style = {styles.orts}>
                 {(!isNullOrUndefined(songosonBaraa.khoolniiDelgerengui) && 
                  songosonBaraa.khoolniiDelgerengui != "" )?
                 <RenderHtml source={{html: songosonBaraa.khoolniiDelgerengui}} /> : ""}
                </View>
                <View style = {styles.footer}>
                    <View style = {{flex:0.5, flexDirection:'row', justifyContent:'space-between'}}>
                        <TextUtga style = {{fontWeight: '400', fontSize: 15}}>Нийт дүн:</TextUtga>
                        <TextUtga style = {{fontWeight: 'bold', fontSize: 17}}>{formatNumber(songosonBaraa.niitDun)}₮</TextUtga>
                    </View>
                    <View style = {{flex:0.5, paddingHorizontal:15, marginLeft: 15, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <TextUtga style = {{fontWeight: '400', fontSize: 15}}>Тоо:</TextUtga>
                        <TooComponent 
                            baraaToo = {songosonBaraa.too}
                            soligdsonTooAvya = {(too, turul)=> soligdsonTooAvya(too, turul)}
                        /> 
                    </View>
                </View>
            </View>
        </ScrollView> 
        {/* <Link href={`/tsesKharakh/?extra=${JSON.stringify({a:"asdasd",b:"asdasd"})}`}  asChild> */}
          <TouchableOpacity onPress={()=> sagsruuNemekh()} style = {styles.switch}>
              <TextUtga style = {{color:'white', fontSize: 16, fontWeight:'bold'}}>Захиалганд нэмэх</TextUtga>
          </TouchableOpacity>
        {/* </Link> */} 
    </View>
  );
}
const styles = StyleSheet.create({
    switch:{
        flexDirection:'row',  
        height: 35,
        borderRadius: 15,
        width: Dimensions.get('screen').width - 75,
        backgroundColor:'#FF6839',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:45,
        left:35,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }, 
    container: {
      flex: 1, 
      backgroundColor: 'white', 
      
    },    
    footer:{
        alignItems:'center',
        height: 50, 
        flexDirection:'row',
        borderTopWidth:1,
        paddingTop: 5,
        borderColor:'#CBDCEE'
    },
    orts:{
        height: Dimensions.get('screen').height - 480,
        padding:5
    },
    medeelel:{
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    logo: {
      width: Dimensions.get('screen').width,
      height: 210,
    },
    location:{  
      flexDirection:'row',
      marginTop: 5,
      alignItems:'center', 
    },
    headerText:{
      fontSize:15,
      fontWeight:'700',
      marginLeft: 10
    },
    header:{
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor:'white',
      alignItems:'center', 
      flexDirection:'row',
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }
  });
  