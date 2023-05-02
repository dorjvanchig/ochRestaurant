
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'; 
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useRouter, Link, useNavigation, useSearchParams } from "expo-router";
import { axs_kholbolt, formatNumber, isNullOrUndefined, sagsniiMedeelelAvya, sagsruuNemye } from '../components';
import _ from 'lodash'
import TsesKharuulakh from './tsesKharuulakh';

export default function TsesKharakhTsonkh() {
  const router = useRouter()
  const navigate = useNavigation()
  const songosonBaiguullaga = useSearchParams(); 
  const [tsesState, setTsesState] = useState({
    bulegTsesKharuulakh: [],
    sagsMedeelel: {}
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
            let jagsaalt = _.groupBy(khariu, 'baraaniiBulgiinKhoch')
            let tmpJagsaalt = []
            if (!isNullOrUndefined(jagsaalt)){
                Object.keys(jagsaalt).forEach(a=> {
                    let object = {bulgiinNer: a, zadargaa: []}
                    jagsaalt[a].forEach(b=> {
                        object.zadargaa.push(b)
                    })
                    tmpJagsaalt.push(object)
                }) 
            }
            tsesState.sagsMedeelel = sagsniiMedeelelAvya()
            tsesState.bulegTsesKharuulakh = tmpJagsaalt
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

  return (
    <View style={styles.container}>
        <CustomStatusBar/>
        <TouchableOpacity onPress={()=> router.back()} style = {styles.header}>
            <TouchableOpacity>
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>{songosonBaiguullaga?.baiguullagiinNer}</TextUtga>
        </TouchableOpacity>
        <ScrollView style = {{flex:0.9, marginBottom: 15}}>
            <View style ={styles.location}>
              <View>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                  <IconMaterial name="map-marker" size={20} color = "#8d8d8d"/>
                  <TextUtga style = {{fontSize:16, fontWeight:'800'}}> 1.2km</TextUtga>
                </View>
                <TextUtga style = {{fontSize:14, fontWeight:'400'}}>50.3мин</TextUtga>
              </View>
              <View style = {{marginLeft: 25}}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                  <IconMaterial name="clock-time-eight" size={18} color = "#8d8d8d" />
                  <TextUtga style = {{fontSize:16, fontWeight:'800'}}> 10:00</TextUtga>
                </View>
                <TextUtga style = {{fontSize:14, fontWeight:'400'}}>19:00 цаг хүртэл</TextUtga>
              </View>
            </View>
            <View style = {{flex:1, paddingHorizontal: 8}}>
              {
                tsesState.bulegTsesKharuulakh.map((ugugdul, muriinDugaar)=>
                  <View style = {{flexDirection:'column'}} key={muriinDugaar}>
                    <TextUtga style = {{textTransform: 'uppercase', fontWeight:'700', fontSize: 15, marginBottom: 15, marginTop: 15}}>{ugugdul.bulgiinNer}</TextUtga>
                    {
                      ugugdul.zadargaa.map((muriinZadargaa,muriinDugaar1)=>
                        <TsesKharuulakh 
                            songosonBaiguullaga = {songosonBaiguullaga}
                            buteegdekhuunDelgerengui = {buteegdekhuunDelgerengui} 
                            ugugdul = {muriinZadargaa} 
                            key = {muriinDugaar1} 
                            muriinDugaar = {muriinDugaar1}
                            sagsruuNemekh = {sagsruuNemekh}
                        />
                      )
                    }
                  </View>
                )
              }
            </View>
        </ScrollView>
        <View style = {{flex: 0.1, alignItems:'center', flexDirection:'row', backgroundColor:'white', justifyContent:'center'}}>
            <Link href={`/sagslakh`}  asChild>
                <TouchableOpacity style = {styles.switch}>
                    <View>
                        <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>{tsesState.sagsMedeelel.too} ширхэг - {formatNumber(tsesState.sagsMedeelel.niitDun)+"₮"}</TextUtga>
                    </View>
                    <View>
                        <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>Харах</TextUtga>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white', 
    },   
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
    switch:{
      flexDirection:'row',  
      height: 50, 
      marginBottom: 25,
      borderRadius: 8,
      width: Dimensions.get('screen').width - 75,
      backgroundColor:'#FF6839',
      alignItems:'center',
      paddingHorizontal: 8,
      justifyContent:'space-between',   
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
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
    location:{  
      flexDirection:'row',
      height: 50, 
      padding:5,
      alignItems:'center',
      paddingHorizontal: 45,
      borderBottomWidth: 1,
      borderColor:'#8d8d8d'
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
  