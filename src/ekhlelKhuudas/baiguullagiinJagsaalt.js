import React, { useContext } from 'react'
import {StyleSheet, View, Dimensions, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import TextUtga from '../components/textUtga';
import { useRouter, useNavigation } from 'expo-router';
import { EkhlelCntx } from './ekhlel';

export default function BaiguullagiinJagsaalt(props) 
{
    const router = useRouter()
    const navigate = useNavigation()
    const ekhlelCntx = useContext(EkhlelCntx)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            ekhlelCntx.bairshlaarBaiguullagaAvya()
          setRefreshing(false);
        }, 200);
    }, []);


    function baiguullagaSongokh(ugugdul) {
      navigate.navigate('tsesKharakh', ugugdul)
    }

    return (
        <ScrollView
            style = {{paddingHorizontal:8}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        {
          ekhlelCntx.state.jagsaaltKharuulakh.map((ugugdul, muriinDugaar) =>{
            return ( 
            <TouchableOpacity 
                key={muriinDugaar} 
                style = {styles.card}  
                onPress = {()=>baiguullagaSongokh(ugugdul)}
            >
                <Image
                    style={styles.logo}
                    source={{uri:ugugdul.zurag}} 
                /> 
                  <View style = {{marginTop: 5, padding: 5}}>
                      <View style = {{flexDirection:'row', alignContent:'center', justifyContent:'flex-start'}}>
                          <View style = {{flex:0.8, flexDirection:'row'}}>
                              <Icon name = "organization" color={'#505050'} size={19} />
                              <TextUtga style = {styles.orgName}>{ugugdul.baiguullagiinNer}</TextUtga> 
                          </View>
                          <View style = {{flex:0.2, flexDirection:'row'}}>
                              <IconMaterial name = "map-marker-distance" color={'#FF6839'} size={19} />
                              <TextUtga style = {styles.distance}>10 км</TextUtga>
                          </View>
                      </View>
                      <View style = {{flexDirection:'row', alignContent:'center', justifyContent:'flex-start', marginTop:6}}> 
                          <Icon name = "location" color={'#505050'} size={19} />
                          <TextUtga style = {styles.location}>{ugugdul.khayag}</TextUtga>
                      </View> 
                  </View>
          </TouchableOpacity>)
          })
        }
        </ScrollView>
    )  
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white',
    },  
    orgName:{
        fontSize: 16,
        marginLeft: 10,
        fontWeight:'500'
    },
    distance:{
        fontSize: 14,
        marginLeft: 10,
        fontWeight:'500',
        color:'orange'
    },
    location:{
        fontSize: 14,
        marginLeft: 10,
        fontWeight:'200'
    },
    logo: {
        width: Dimensions.get('screen').width-35,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height: 150,
      },
    card:{ 
      marginTop: 10,
      borderRadius: 10,
      position:'relative',
      backgroundColor:'white',   
      borderWidth:1,
      borderColor:'#fdfdfd',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }
  });