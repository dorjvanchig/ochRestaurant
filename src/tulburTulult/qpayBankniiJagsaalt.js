import React from 'react'
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import TextUtga from '../components/textUtga'


export default function QpayBankniiJagsaalt(props) {
  const { tulburiinMedeelel, deeplinking } = props
  return (
    <View style = {{height: Dimensions.get('window').height - 180, paddingVertical: 3}}>
      <ScrollView  
        showsVerticalScrollIndicator={false} 
        style = {{flex:1, overflow:'scroll', marginBottom: 15}}>
        {
          tulburiinMedeelel.qpayMedeelel?.urls?.map((ugugdul, muriinDugaar)=>
            <TouchableOpacity 
              onPress={()=> deeplinking(ugugdul)}
              key={muriinDugaar} 
              style = {{flexDirection:'row', alignItems:'center', padding: 5, backgroundColor:'white', marginTop: 8, borderRadius: 8}}>
              <Image source={{uri: ugugdul.logo}}
                  style={{width: 50, height: 50, borderRadius: 8}} />
              <View style = {{paddingHorizontal: 15}}>
                <TextUtga style = {{fontSize: 15, fontWeight: '400'}}>{ugugdul.description}</TextUtga>
              </View>
            </TouchableOpacity>
          )
        }
      </ScrollView>
    </View>
  )
}
