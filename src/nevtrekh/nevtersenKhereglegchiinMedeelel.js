import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import TextUtga from '../components/textUtga'
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import IconFeather from 'react-native-vector-icons/Feather'; 
import { deleteStoreData } from '../components/shigtgee';
import { useRouter } from 'expo-router';
import { EkhlelCntx } from '../ekhlelKhuudas/ekhlel';
export default function NevtersenKhereglegchiinMedeelel() {
  const ekhlelCntx = useContext(EkhlelCntx)
  const insets = useSafeAreaInsets();
  const router = useRouter()
  function garakh(ugugdul) {
    deleteStoreData('khereglegch').then(khariu=>{
      ekhlelCntx.state.nevtersenKhereglegch = undefined
      ekhlelCntx.khuudasSergeekh()
      global.buteegdekhuunSags = []
      router.push('/')
    })
  }
  return (
    <View style = {{top:insets.top, flex:1}}>
      <View style = {styles.frofile}>
        <View style = {{backgroundColor:'#f7f7f7', padding: 23, borderRadius: 80, alignItems:'center', justifyContent:'center', marginBottom: 11}}>
          <IconFeather name="user-check" size={35} color= "#ff9030"/>
        </View>
        <TextUtga>88045424</TextUtga>
        <TextUtga style = {{color:'#cbcbcb'}}>Утасны дугаар</TextUtga>
      </View>
      <View style = {{marginTop: 9}}>
          <ScrollView>
            {[{
              name:'Гарах',
              icon: <IconFeather name="log-out" size={25} color= "#bfcffa"/>
            }].map((ugugdul, muriinDugaar)=>
              <TouchableOpacity onPress={()=> garakh(ugugdul)} key={muriinDugaar} style = {styles.tile}>
                <View style = {styles.icon}>
                 {ugugdul.icon}
                </View>
                <TextUtga style = {styles.text}>{ugugdul.name}</TextUtga>
              </TouchableOpacity>
            )}
          </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  text:{
    marginLeft: 15,
    fontSize: 18,
    fontWeight:'400'
  },
  icon:{
    backgroundColor:'white',
    padding: 3,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  frofile:{
    height: 150,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00, 
    elevation: 1,
  },
  tile:{
    marginHorizontal: 10,
    backgroundColor:'#f3f4fb',
    flexDirection:'row',
    alignItems:'center',
    marginTop: 8,
    padding: 12,
    borderRadius: 8
  }
})