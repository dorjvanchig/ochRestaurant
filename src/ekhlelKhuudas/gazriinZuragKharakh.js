import { useContext } from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import GazriinZurag from '../components/gazriinZurag'
import { Marker, Circle } from 'react-native-maps';
import { EkhlelCntx } from './ekhlel'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import TextUtga from '../components/textUtga';



export default function GazriinZuragKharakh(props) 
{
    const ekhlelCntx = useContext(EkhlelCntx)
    function onRegionChange(r) {
        // if (r != undefined) {
        //     ekhlelCntx.setBvsNutag(r)
        //     ekhlelCntx.state.miniiBairshil = {
        //         latitude: r.latitude,
        //         longitude: r.longitude,
        //     }
        //     ekhlelCntx.khuudasSergeekh()
        // } 
    }

    return (<View style = {{flex:1}}>
        <GazriinZurag
            region = {ekhlelCntx.bvsNutag}
            onRegionChangeComplete = {onRegionChange}
        >
            <Marker
                key={"miniiBairshil"}
                radius={1500}
                coordinate={{latitude:ekhlelCntx.state.miniiBairshil.latitude, longitude: ekhlelCntx.state.miniiBairshil.longitude}} 
            >
                <View style = {{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <View style = {{height:20, width: 95, borderRadius: 5, backgroundColor:'#0089ff', alignItems:'center', justifyContent:'center'}}>
                        <TextUtga style = {styles.text}>Та энд байна</TextUtga>
                    </View>
                        <MaterialIcons name="my-location" size={24} color="#0089ff" />
                    </View>
            </Marker>
            {ekhlelCntx.state.jagsaaltKharuulakh.map((baiguullaga, index) => 
                <Marker
                    key={index}
                    coordinate={{latitude: baiguullaga.urtrag, longitude:baiguullaga.urgurug}}
                    title={baiguullaga.baiguullagiinNer}
                >
                     <Image
                        style={styles.logo}
                        source={require('../../zurag/zochin.jpg')}
                  />
                </Marker>
            )}
        </GazriinZurag>
    </View>)
}

const styles = StyleSheet.create({
    logo: {
        width: 35,
        borderRadius: 50,
        height: 35,
      },
    text:{
        color:'white',
        fontWeight:'600'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27, 
        elevation: 10,
    },   
   
  });