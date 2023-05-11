import React, { useEffect, useRef } from 'react'
import {Dimensions, StyleSheet, Animated } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

export default function GazriinZurag(props) 
{
    const mapAnimation = useRef(new Animated.Value(0)).current; 

    const animateMap = () => {
        Animated.timing(mapAnimation, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };
    
    useEffect(()=> {
        animateMap() 
    }, [])


    const mapStyle = {
        transform: [
            {
            translateY: mapAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [500, 0],
            }),
            },
        ],
    };
    
    return (
        <Animated.View style = {[styles. mapContainer, mapStyle]}>
            <MapView 
                {...props}
                ref = {props.mapRef}
                mapType="none"
                //provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={props.region} 
                followsUserLocation={true}
                showsCompass={true} 
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
            // onRegionChangeComplete={(r) => onRegionChange(r)}
            >
                {props.children}
            </MapView>
        </Animated.View>)
}

const styles = StyleSheet.create({
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
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('screen').height - 89,
    overflow: 'hidden',
  },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});