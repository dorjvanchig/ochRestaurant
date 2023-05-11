import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, useWindowDimensions } from "react-native";
import RenderHtml from 'react-native-render-html';
import TextUtga from "../components/textUtga";
import { useRouter, Link, useSearchParams } from "expo-router";
import TooComponent from "../components/tooComponent";  
import { formatNumber, isNullOrUndefined, sagsniiMedeelelAvya } from "../components";
import { useEffect, useState } from "react";
import _ from 'lodash'
import { delgrenguiMedeelleesSagsruuNemekh } from "../components/shigtgee";
import TolgoiButsakh from "./tolgoiButsakh";
import DelgerenguiZurag from "./delgerenguiZurag";
export default function DelgerenguiMedeelel() {
  const { width } = useWindowDimensions()
  const router = useRouter() 
  const songosonItem =  useSearchParams(); 
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
  return (
    <View style={styles.container}>
       <TolgoiButsakh />
       <DelgerenguiZurag songosonBaraa = {songosonBaraa}/>
       <View style = {{flex: 0.3, position:'relative'}}>
          <Image 
              style = {styles.backLogo}
              source={{uri:songosonBaraa.zurag}}
              blurRadius = {5}
              loadingIndicatorSource = {require('../../zurag/cropped-placeholder.jpg')}
          />   
      </View>  
      <View style = {{flex: 0.7}}>
        <ScrollView style = {{flex: 0.7, marginTop: 70, paddingHorizontal: 25}}>
          <View style = {{alignItems:'center', justifyContent:'center', marginBottom: 15}}>
            <TextUtga style = {styles.textUtga}>{songosonBaraa.baarKodniiNer}</TextUtga>
          </View>
          {(!isNullOrUndefined(songosonBaraa.khoolniiDelgerengui) && 
            songosonBaraa.khoolniiDelgerengui != "" )?
            <RenderHtml contentWidth={width} source={{html: songosonBaraa.khoolniiDelgerengui}} /> : ""}
        </ScrollView>
        <View style = {{flex: 0.3, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal: 8}}>
          <View style = {{height: 45, backgroundColor: '#e0e3e9', justifyContent:'center', alignItems:'center', borderRadius: 8, padding:4}}>
            <TooComponent 
                baraaToo = {songosonBaraa.too}
                soligdsonTooAvya = {(too, turul)=> soligdsonTooAvya(too, turul)}
            /> 
          </View>
           <TouchableOpacity onPress={()=> sagsruuNemekh()} style = {styles.switch}>
              <TextUtga style = {{fontWeight: 'bold', color:'white', fontSize: 17}}>{formatNumber(songosonBaraa.niitDun)}₮</TextUtga>
              <TextUtga style = {{fontWeight: '400', color:'white', fontSize: 17}}>НЭМЭХ</TextUtga>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ 
    container: {
      flex: 1,  
    },     
    switch:{
      flexDirection:'row',  
      height: 45,
      width: 260,
      borderRadius: 8, 
      backgroundColor:'#FF6839',
      alignItems:'center',
      justifyContent:'space-between',  
      paddingHorizontal: 35
    }, 
    textUtga:{
      fontSize: 20,
      fontWeight: '500',
      textTransform:'capitalize'
    },
    backLogo:{ 
      backgroundColor:'#312f3c',
      height: Dimensions.get('screen').height - 568,
      width: Dimensions.get('screen').width
    }, 
  });
  