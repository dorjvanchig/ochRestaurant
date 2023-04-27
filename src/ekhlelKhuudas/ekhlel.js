import React, {useState, useEffect, createContext } from 'react';
import { 
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import CustomStatusBar from '../components/statusBar';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import BaiguullagiinJagsaalt from './baiguullagiinJagsaalt'; 
import GazriinZuragKharakh from './gazriinZuragKharakh';
import TurulSoligch from '../components/turulSoligch';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import {axs_kholbolt} from '../components/'
import { bairshilAvya, uuriinBairshilAvakh } from '../components/bairshilAvya';

global.buteegdekhuunSags = []
export const EkhlelCntx = createContext({})

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.030 //0.005 //
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

let ankhniiUtga = {
    latitude: 47.912783059062605,
    longitude: 106.91387778148055,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
}
const Ekhlel = (props) => { 
  const [state, setState] = useState({
    turul: 'Жагсаалт',
    jagsaaltKharuulakh: [],
    miniiBairshil: undefined, 
  })

  const [bvsNutag, setBvsNutag] = useState(ankhniiUtga)

  useEffect(()=> 
  {
    bairshlaarBaiguullagaAvya()
  }, [])

  function bairshlaarBaiguullagaAvya() {
    uuriinBairshilAvakh().then(bairshil =>
    { 
        axs_kholbolt('api/restauraniiJagsaaltAvya', {lat: bairshil.latitude, lon: bairshil.longitude})
        .then(khariu=>
        { 
            console.log('restauraniiJagsaaltAvya', khariu)
            state.jagsaaltKharuulakh = khariu
            state.miniiBairshil = bairshil
            khuudasSergeekh()
        })
    })  
  }
  

  function khuudasSergeekh() {
    setState({...state})
  }

  function turulSolikh(turul) {
    state.turul = turul
    bairshlaarBaiguullagaAvya()
  }

  return (
    <EkhlelCntx.Provider 
        value={{
            state,
            bvsNutag, 
            setBvsNutag,
            khuudasSergeekh
        }}>
      <View style={styles.container}>
          <CustomStatusBar />
          <View style = {styles.header}>
            <View style = {{padding:3, borderRadius:15, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                <Icon name = "navicon" color={'#505050'} size={19} />
            </View>
            <View style = {{flexDirection:'row'}}>
              <View style = {{padding:3, borderRadius:15, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                <Icon name = "search" color={'#505050'} size={19} />
              </View>
              <View style = {{borderRadius:15, padding:3, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                <Icon name = "shopping-basket" color={'#505050'} size={19} />
              </View>
              <View style = {{backgroundColor:'#ffd739', borderRadius:15, padding:3, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                <Icon name = "user" color={'#505050'} size={19}/>
              </View>
            </View>
          </View>
          <View style = {[styles.content, {paddingHorizontal: state.turul === "Жагсаалт" ? 15 : 0, paddingVertical: state.turul === "Жагсаалт" ? 15 : 0}]}> 
            {
              state.turul === "Жагсаалт" ?
              <BaiguullagiinJagsaalt /> 
            : <GazriinZuragKharakh/>
            }
            <TurulSoligch
              jagsaalt = {
              [
                  {ner:'Жагсаалт', icon: <Icon name='list-ul' size={16}/>}, 
                  {ner:'Байршил', icon: <IconSimple name='location-pin' size={16}  />}
              ]}
              turulSolikh = {turulSolikh}
              state = {state}
            /> 
          </View>
      </View>
    </EkhlelCntx.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white', 
  },  
  content:{
    flex:1, 
  },
  header:{
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
});

export default Ekhlel;