import { Link, useRouter } from 'expo-router';
import React from 'react'
import { TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import IconFeather from 'react-native-vector-icons/Feather'; 
import { Badge, sagsniiMedeelelAvya } from '../components';

export default function TolgoiButsakh() {
    const router = useRouter()
    const insets = useSafeAreaInsets();
    
  return (<View style = {[styles.header, { top: insets.top }]}>
      <TouchableOpacity style ={styles.bottom} onPress = {()=> router.back()}>
          <IconFeather name="arrow-left" size={21} color= "#97969d"/>
      </TouchableOpacity>
      <Link href={`/sagslakh`}  asChild>
          <TouchableOpacity style ={styles.bottom}>
            <Badge value = {sagsniiMedeelelAvya()?.too}>
            </Badge>
              <IconFeather name="shopping-bag" size={21} color= "#97969d"/>
          </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    bottom:{
        backgroundColor:'white',
        height:30,
        width: 35,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 5,
        position:'relative'
    },
    header:{
        position:'absolute',  
        width:Dimensions.get('window').width - 10, 
        marginLeft: 5, 
        height: 35, 
        paddingHorizontal: 28, 
        justifyContent:'space-between', 
        alignItems:'center',
        zIndex:1, 
        flexDirection:"row"
    }
})
