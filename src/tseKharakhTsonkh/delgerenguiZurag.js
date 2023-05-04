import React from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import TextUtga from '../components/textUtga';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useSafeAreaInsets} from 'react-native-safe-area-context';

export default function DelgerenguiZurag(props) 
{
  const insets = useSafeAreaInsets();
  const { songosonBaraa } = props
  return ( <View style = {[styles.content, {top: -insets.top+165}]}> 
              <View style = {styles.root}>
                <Image 
                    style = {styles.image}
                    source={{uri:songosonBaraa.zurag}}
                    loadingIndicatorSource = {require('../../zurag/cropped-placeholder.jpg')}
                />  
              </View>
            </View>)
}

const styles = StyleSheet.create({ 
  image:{
    height: 170,
    width: Dimensions.get('window').width - 80,
    borderRadius: 18
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
    alignItems:'center',
    height: 180, 
    width: Dimensions.get('window').width - 70, 
    borderRadius: 18
  }
})