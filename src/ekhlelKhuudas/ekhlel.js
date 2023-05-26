import React, {useState, useEffect, createContext, useRef } from 'react';
import { 
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity, 
} from 'react-native';
import CustomStatusBar from '../components/statusBar';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import BaiguullagiinJagsaalt from './baiguullagiinJagsaalt'; 
import GazriinZuragKharakh from './gazriinZuragKharakh';
import TurulSoligch from '../components/turulSoligch';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import {axs_kholbolt, Badge, getStoreData, isNullOrUndefined, sagsniiMedeelelAvya} from '../components/'
import { uuriinBairshilAvakh } from '../components/bairshilAvya';
import { Link, useNavigation } from 'expo-router';
import _ from 'lodash'
import TextUtga from '../components/textUtga';
import DrawerLayout from '../components/drawerLayout';
import NevtersenKhereglegchiinMedeelel from '../nevtrekh/nevtersenKhereglegchiinMedeelel';

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
  const navigate = useNavigation()
  const [state, setState] = useState({
    turul: 'Жагсаалт',
    jagsaaltKharuulakh: [],
    miniiBairshil: undefined, 
    nevtersenKhereglegch: undefined
  })

  const [drawer, setDrawer] = useState(false)
  const [bvsNutag, setBvsNutag] = useState(ankhniiUtga)

  useEffect(()=> 
  {
    getStoreData('khereglegch').then(khariu=>{ 
      state.nevtersenKhereglegch = khariu
      khuudasSergeekh()
    })
    bairshlaarBaiguullagaAvya()
  }, [])

  function bairshlaarBaiguullagaAvya() {
    uuriinBairshilAvakh().then(bairshil =>
    { 
        axs_kholbolt('api/restauraniiJagsaaltAvya', {lat: bairshil.latitude, lon: bairshil.longitude})
        .then(khariu=>
        {  
            state.jagsaaltKharuulakh = khariu
            let object = _.cloneDeep (state.jagsaaltKharuulakh[0])
            object.urgurug = 47.919649622610734
            object.urtrag = 106.89988968657168
            state.jagsaaltKharuulakh.push(object)

            let object1 = _.cloneDeep(object)
            object1.urgurug = 47.92485504146591
            object1.urtrag = 106.88139317320498
            state.jagsaaltKharuulakh.push(object1)

            let object2 = _.cloneDeep(object1)
            object2.urgurug = 47.92356092548205
            object2.urtrag = 106.95968012919167
            state.jagsaaltKharuulakh.push(object2)

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
    <DrawerLayout 
      drawerWidth={290} 
      onHide={()=> setDrawer(false)}
      onShow = {()=> console.log('aaaa')}
      open = {drawer}
      drawerContent={<NevtersenKhereglegchiinMedeelel />} 
      mainContent={
        <EkhlelCntx.Provider 
          value={{
              state,
              bvsNutag, 
              setBvsNutag,
              khuudasSergeekh,
              bairshlaarBaiguullagaAvya
          }}> 
          <View style={styles.container}>
              <CustomStatusBar />
              <View style = {styles.header}>
                <TouchableOpacity 
                    onPress={()=> !isNullOrUndefined(state.nevtersenKhereglegch) ? setDrawer(true) : navigate.navigate('nevtrekh')} 
                    style = {{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View 
                      style = {{backgroundColor:'#ffd739', borderRadius:15, padding:3, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                      <Icon name = "user" color={'#505050'} size={19}/>
                    </View>
                    <TextUtga style = {{color:'gray'}}>{state.nevtersenKhereglegch?.utas}</TextUtga>
                </TouchableOpacity>
                <View style = {{flexDirection:'row'}}>
                  <View style = {{padding:3, borderRadius:15, marginRight: 8, width: 30, height: 30, alignItems:'center', justifyContent:'center'}}>
                    <Icon name = "search" color={'#505050'} size={19} />
                  </View>
                  <Link href={`/sagslakh`}  asChild>
                    <TouchableOpacity style = {{borderRadius:15, padding:3, marginRight: 8, width: 30, height: 30,  flexDirection:'row', alignItems:'center', justifyContent:'center', position:'relative'}}>
                      <Badge style = {{top: -8, left: 21}} value = {sagsniiMedeelelAvya()?.too}/>
                      <Icon name = "shopping-basket" color={'#505050'} size={19} />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
              <TurulSoligch
                  jagsaalt = {
                  [
                      {ner:'Жагсаалт', icon: <Icon name='list-ul' size={16}/>}, 
                      {ner:'Байршил', icon: <IconSimple name='location-pin' size={16}  />}
                  ]}
                  turulSolikh = {turulSolikh}
                  state = {state}
                /> 
              <View style = {[styles.content, {marginTop: state.turul === "Жагсаалт" ? 35 : 0, paddingHorizontal: state.turul === "Жагсаалт" ? 15 : 0, paddingVertical: state.turul === "Жагсаалт" ? 15 : 0}]}> 
                {
                  state.turul === "Жагсаалт" ?
                  <BaiguullagiinJagsaalt /> 
                : <GazriinZuragKharakh/>
                } 
              </View>
          </View>
        </EkhlelCntx.Provider>
      } 
    /> 
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
    paddingHorizontal: 21,
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