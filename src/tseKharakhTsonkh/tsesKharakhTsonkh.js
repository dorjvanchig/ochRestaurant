
import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Animated, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import TextUtga from "../components/textUtga";
import { Link, useNavigation, useSearchParams } from "expo-router";
import { axs_kholbolt, formatNumber, isNullOrUndefined, sagsniiMedeelelAvya, sagsruuNemye } from '../components';
import _ from 'lodash'
import TsesKharuulakh from './tsesKharuulakh';
import BaiguullagaMedeelel from './baiguullagaMedeelel';
import TolgoiButsakh from './tolgoiButsakh';
export default function TsesKharakhTsonkh() {
  const navigate = useNavigation()
  const songosonBaiguullaga = useSearchParams();  

  const [tsesState, setTsesState] = useState({
    bulegTsesKharuulakh: [],
    sagsMedeelel: {},
    songosonBuleg: {}
  })
  useEffect(()=>{
      menuJagsaaltAvya() 
  }, [songosonBaiguullaga]) 
  

  function khuudasSergeekh() {
      setTsesState({...tsesState})
  }

  function menuJagsaaltAvya() 
  {
      axs_kholbolt('api/menuJagsaaltAvya', {baiguullagiinKhoch: songosonBaiguullaga?.baiguullagiinKhoch}).then(khariu=>{
        console.log('khariu', khariu)
          let jagsaalt = _.groupBy(khariu, 'baraaniiBulgiinKhoch')
          let tmpJagsaalt = []
          if (!isNullOrUndefined(jagsaalt)){
              Object.keys(jagsaalt).forEach(a=> {
                  let object = {baraaniiBulgiinKhoch: a, zadargaa: []}
                  jagsaalt[a].forEach(b=> {
                      object.zadargaa.push(b)
                  })
                  tmpJagsaalt.push(object)
              }) 
          }
          tsesState.sagsMedeelel = sagsniiMedeelelAvya()
          tsesState.bulegTsesKharuulakh = tmpJagsaalt
          tsesState.songosonBuleg = !isNullOrUndefined(tsesState.bulegTsesKharuulakh) ? tsesState.bulegTsesKharuulakh[0] : {}
          khuudasSergeekh() 
      })
  }

  function buteegdekhuunDelgerengui(ugugdul) {
      navigate.navigate('buteegdekhuunDelgerengui', ugugdul) 
  }

  function sagsruuNemekh(ugugdul) { 
      sagsruuNemye(ugugdul, 'nemekh')
      tsesState.sagsMedeelel = sagsniiMedeelelAvya()  
      setTsesState({...tsesState})
  } 

  function bulegSongokh(ugugdul) {
    tsesState.songosonBuleg = ugugdul
    setTsesState({...tsesState})
  } 

  return (
    <View style = {{flex:1}}>
      <BaiguullagaMedeelel songosonBaiguullaga = {songosonBaiguullaga}/>
      <View style = {{flex: 0.2, position:'relative'}}>
        <TolgoiButsakh/>
        <Image
            blurRadius={5}
            style={styles.backLogo}
            source={require('../../zurag/background.jpg')}
        />
      </View>  
      <View style={styles.container1}>   
       <View style = {{marginTop: 55}}>
          <TextUtga style = {styles.tsesText}>Манай цэсүүд</TextUtga>
       </View>
        <View style = {{height: 50, marginTop: 5, marginBottom: 5, paddingHorizontal: 8, paddingVertical: 1}}>
            <ScrollView 
              horizontal = {true} 
              showsHorizontalScrollIndicator={false} 
              automaticallyAdjustContentInsets={false}
            >
              {tsesState.bulegTsesKharuulakh.map((ugugdul, muriinDugaar)=>
                <TouchableOpacity 
                  onPress={()=> bulegSongokh(ugugdul)}
                  key={"buleg"+muriinDugaar} style = {[styles.buleg, {backgroundColor: ugugdul.baraaniiBulgiinKhoch === tsesState.songosonBuleg?.baraaniiBulgiinKhoch ? "#fe6837" : '#fafafa'}]}>
                  <TextUtga style = {{color: ugugdul.baraaniiBulgiinKhoch === tsesState.songosonBuleg?.baraaniiBulgiinKhoch ? "white" : '#a1a1a1', fontWeight:'700'}}>{ugugdul.baraaniiBulgiinKhoch}</TextUtga>
                </TouchableOpacity>
              )  
            }
            </ScrollView>
        </View> 
        {/* <Animated.View
              style={[
                position.getLayout(),
                {
                  transform: [{ scale }],
                },
              ]}
        >
            <View style={{backgroundColor: 'red', height: 100, width: 100}}>
            <TextUtga>aaa</TextUtga>
          </View>
        </Animated.View> */}
        <ScrollView style = {{flex: 0.9, marginTop: 10}}>
            <View style={styles.scrollContainer}>
                {
                  tsesState.songosonBuleg?.zadargaa?.map((muriinZadargaa,muriinDugaar1)=>
                    <TsesKharuulakh 
                        songosonBaiguullaga = {songosonBaiguullaga}
                        buteegdekhuunDelgerengui = {buteegdekhuunDelgerengui} 
                        ugugdul = {muriinZadargaa} 
                        key = {"baraa"+muriinDugaar1} 
                        muriinDugaar = {muriinDugaar1}
                        sagsruuNemekh = {sagsruuNemekh}
                    />
                  )
                }
            </View>
        </ScrollView>
      </View> 
  </View>
  );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 0.9,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 3,
    },   
    container1: {
      flex: 0.8, 
      backgroundColor: 'white',   
      paddingVertical:3
    },    
    buleg:{
      height: 35,
      padding: 8,
      alignItems:'center',
      flexDirection:'row', 
      marginLeft: 8,
      marginTop: 8,
      borderRadius: 10
    },
    plus:{
        position:'absolute',
        right: 15,
        bottom:5,
    }, 
    backLogo:{ 
      height: Dimensions.get('screen').height - 568,
      width: Dimensions.get('screen').width
    }, 
    tsesText:{
      color: 'black',
      fontWeight: '500',
      fontSize: 15,
      marginLeft: 15
    }
});
  