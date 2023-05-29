import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback } from 'react-native';

const DrawerLayout = ({ drawerContent, mainContent, drawerWidth, onShow, onHide, open = false }, props) => {
  const [drawerOpen, setDrawerOpen] = useState(open);
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
    //   onPanResponderMove: Animated.event([null, { dx: translateX }]),
      onPanResponderRelease: (e, { vx, dx }) => {
        const velocity = Math.abs(vx);
        const distance = Math.abs(dx);
        if (velocity > 0.5 && distance > 50) {
          //toggleDrawer();
        } else {
          closeDrawer();
        }
      },
    })
  ).current;

  useEffect(() => { 
    console.log('khugatsaaStr', open)
    if (open){
        setDrawerOpen(open)
        toggleDrawer()
    }
    else {
      closeDrawer()
    }
  }, [open])
  

  const toggleDrawer = () => {
    const toValue = drawerOpen ? -drawerWidth : 0;
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(!drawerOpen);
      if (!drawerOpen && onShow) {
        onShow();
      } else if (drawerOpen && onHide) {
        onHide();
      }
    });
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setDrawerOpen(false);
      if (onHide) {
        onHide();
      }
    });
  };

  const animatedStyle = {
    transform: [{ translateX: translateX }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableWithoutFeedback 
        //onPress={closeDrawer}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, backgroundColor:'red' }}>{mainContent}</View>
      </View>
      <Animated.View style={[styles.drawer, { width: drawerWidth }, animatedStyle]} {...panResponder.panHandlers}>
        {drawerContent}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default DrawerLayout;
