import React from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import TextUtga from '../components/textUtga';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useSafeAreaInsets} from 'react-native-safe-area-context';

export default function BaiguullagaMedeelel(props) 
{
  const insets = useSafeAreaInsets();
  const { songosonBaiguullaga } = props
  return ( <View style = {[styles.content, {top: -insets.top+145}]}> 
              <View style = {styles.root}>
                <View style = {styles.logo}>
                  <Image 
                    style={styles.image}
                    source={{uri:songosonBaiguullaga.zurag}} 
                  />
                </View>
                <View style = {styles.baiguullagaText}>
                  <TextUtga style = {{fontSize: 18, color:'#48414b', fontWeight: '500'}}>{songosonBaiguullaga?.baiguullagiinNer}</TextUtga>
                </View>
                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style = {styles.bottom}>
                      <IconMaterialIcons color = "#7fc78e" size={16} name = "stop-circle" />
                      <TextUtga>Нээлттэй</TextUtga>
                    </View>
                    <View style = {styles.bottom}>
                      <TextUtga>10-20 min</TextUtga>
                    </View>
                    <View style = {styles.bottom}>
                      <IconMaterialIcons color = "#ff6839" size={16} name = "stars" />
                      <TextUtga>4-7</TextUtga>
                    </View>
                </View>
              
              </View>
            </View>)
}

const styles = StyleSheet.create({ 
  logo:{
    backgroundColor:'white',
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    zIndex: 2,
    padding: 1, 
    right:130,
    top: -25,
    borderRadius: 60,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  image:{
    height: 55,
    width: 55,
    borderRadius: 60
  },
  bottom:{
    backgroundColor:'white',
    padding: 8,
    height: 30,
    marginRight: 5,
    width:90,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 6,
    borderRadius: 5
  },
  baiguullagaText:{
    flexDirection:'row', 
    alignItems:'flex-end', 
    justifyContent:'space-around',
    height: 45,
    marginBottom: 5
  },
  content:{
    flexDirection:'column', 
    paddingHorizontal: 35, 
    position:'absolute', 
    zIndex: 1,  
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  root:{
    backgroundColor:'#fafafa', 
    justifyContent:'center', 
    height: 100, 
    width: Dimensions.get('window').width - 70, 
    borderRadius: 18
  }
})