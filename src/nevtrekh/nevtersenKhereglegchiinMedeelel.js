import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import TextUtga from '../components/textUtga'
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import IconFeather from 'react-native-vector-icons/Feather'; 
import { deleteStoreData } from '../components/shigtgee';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg'; 
import { EkhlelCntx } from '../ekhlelKhuudas/ekhlel';
export default function NevtersenKhereglegchiinMedeelel(props) { 
  const { setDrawer, state, khuudasSergeekh } = props
  const ekhlelCntx = useContext(EkhlelCntx)
  const insets = useSafeAreaInsets();
  const router = useRouter()

  function solikh(ugugdul){
    if (ugugdul.name == "Гарах")
      garakh(ugugdul)
    else {
      router.push('/tulburKhuleegdsen')
    }
  }

  function garakh(ugugdul) {
    deleteStoreData('khereglegch').then(khariu=>{
      state.nevtersenKhereglegch = undefined
      khuudasSergeekh()
      global.buteegdekhuunSags = []
      router.push('/')
      setDrawer(false)
    })
  }
  return (
    // top:insets.top
    <View style = {{flex:1}}>
      <View style = {styles.box}>
        <Svg 
            height={115}
            style = {{backgroundColor:'transparent', marginTop: 18}}
            width={Dimensions.get('screen').width - 85}
            viewBox="0 0 1440 320" 
          >
            <Path
              fill="#FF6839" 
              d='M0,224L80,192C160,160,320,96,480,96C640,96,800,160,960,165.3C1120,171,1280,117,1360,90.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'
            />
        </Svg>
      </View> 
      <View style = {{flex: 0.3, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <View style = {{backgroundColor:'#f7f7f7', padding: 23, borderRadius: 80, alignItems:'center', justifyContent:'center', marginBottom: 11}}>
            <IconFeather name="user-check" size={35} color= "#ff9030"/>
          </View>
          <TextUtga>{state?.nevtersenKhereglegch?.utas}</TextUtga>
          <TextUtga style = {{color:'#cbcbcb'}}>Утасны дугаар</TextUtga>
      </View>
      <View style = {{marginTop: 9, flex: 0.8}}>
          <ScrollView>
            {[
            {
              name:'Миний захиалга',
              icon: <IconFeather name="shopping-bag" size={25} color= "#bfcffa"/>
            },
            {
              name:'Гарах',
              icon: <IconFeather name="log-out" size={25} color= "#bfcffa"/>
            },
          ].map((ugugdul, muriinDugaar)=>
              <TouchableOpacity onPress={()=> solikh(ugugdul)} key={muriinDugaar} style = {styles.tile}>
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
  box: {
    backgroundColor: '#FF6839', 
    height: 45,
  },
  icon:{
    backgroundColor:'white',
    padding: 8,
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
  },
  tile:{
    marginHorizontal: 10, 
    backgroundColor:'#e5e5e53d',
    flexDirection:'row',
    alignItems:'center',
    marginTop: 8,
    padding: 12,
    borderRadius: 8
  }
})