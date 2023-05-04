import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Image, Dimensions, Animated, Platform, TouchableOpacity } from 'react-native'
import GazriinZurag from '../components/gazriinZurag'
import { Marker, Circle } from 'react-native-maps';
import { EkhlelCntx } from './ekhlel'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import TextUtga from '../components/textUtga';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Octicons';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function GazriinZuragKharakh(props) 
{
    const navigate = useNavigation()
    const ekhlelCntx = useContext(EkhlelCntx)
    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    const [kharakhEsekh, setKharakhEsekh] = useState(false)
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
          if (index >= ekhlelCntx.state.jagsaaltKharuulakh?.length) {
            index = ekhlelCntx.state.jagsaaltKharuulakh?.length - 1;
          }
          if (index <= 0) {
            index = 0;
          }
    
          clearTimeout(regionTimeout);
    
          const regionTimeout = setTimeout(() => {
            if( mapIndex !== index ) {
              mapIndex = index;
              const coordinate = ekhlelCntx.state.jagsaaltKharuulakh[index];
              _map.current.animateToRegion(
                {
                  latitude: coordinate?.urgurug, 
                  longitude:coordinate?.urtrag,
                  latitudeDelta: ekhlelCntx.bvsNutag.latitudeDelta,
                  longitudeDelta: ekhlelCntx.bvsNutag.longitudeDelta,
                },
                350
              );
            }
          }, 10);
        });
      });

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

    const onMarkerPress = (mapEventData) => {
        setKharakhEsekh(true)
        const markerID = mapEventData._targetInst.return.key; 
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        } 
        setTimeout(()=>{
            _scrollView.current.scrollTo({x: x, y: 0, animated: true});
        }, 10)
      }

      const interpolations = ekhlelCntx.state.jagsaaltKharuulakh?.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1.5, 1.8, 1],
          extrapolate: "clamp"
        });
        return { scale };
      });

    return (<View style = {{flex:1}}>
        <GazriinZurag
            mapRef = {_map}
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
            {ekhlelCntx.state.jagsaaltKharuulakh?.map((baiguullaga, index) => 
                {
                const scaleStyle = {
                    transform: [
                        {
                        scale: interpolations[index].scale,
                        },
                    ],
                };
                return (
                <Marker
                    key={index}
                    onPress={(e)=>onMarkerPress(e)}
                    coordinate={{latitude: baiguullaga.urgurug, longitude:baiguullaga.urtrag}}
                    title={baiguullaga.baiguullagiinNer}
                >
                    <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                        source={{uri:baiguullaga.zurag}} 
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                        />
                    </Animated.View> 
                </Marker>)}
            )}
        </GazriinZurag>
        {kharakhEsekh &&
        <Animated.ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET
            }}
            contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            }}
            onScroll={Animated.event(
            [
                {
                nativeEvent: {
                    contentOffset: {
                    x: mapAnimation,
                    }
                },
                },
            ],
            {useNativeDriver: true}
            )}
        >
            {kharakhEsekh && ekhlelCntx.state.jagsaaltKharuulakh?.map((ugugdul, index) =>(
                <TouchableOpacity key={index} 
                    style = {styles.card}  
                    onPress = {()=> navigate.navigate('tsesKharakh', ugugdul)}
                    // onPress = {()=> router.push({pathname:'/tsesKharakh', params: ugugdul})}
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
                </TouchableOpacity>
            ))}
        </Animated.ScrollView>}
    </View>)
}

const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('screen').width-35,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        height: 150,
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27, 
        elevation: 10,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
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
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT ,
        width: CARD_WIDTH,
        overflow: "hidden",
        marginBottom: 35
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
   
  });