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
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        {
          ekhlelCntx.state.jagsaaltKharuulakh.map((ugugdul, muriinDugaar) =>{
            return ( 
            <TouchableOpacity key={muriinDugaar} 
                    style = {styles.card}  
                    onPress = {()=> navigate.navigate('tsesKharakh', ugugdul)}
                    // onPress = {()=> router.push({pathname:'/tsesKharakh', params: ugugdul})}
                    >
                <Image
                      style={styles.logo}
                      source={require('../../zurag/yuna.jpg')}
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
        width: Dimensions.get('screen').width-30,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height: 150,
      },
    card:{ 
      marginTop: 15,
      borderRadius: 10,
      position:'relative',
      backgroundColor:'white',  
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }
  });