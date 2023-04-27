import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function FlashMessage({ message, duration = 2000, backgroundColor = '#007aff' }){ 
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      delay: duration - 500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
    }, duration);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 8,
    maxWidth: '80%',
    position: 'absolute',
    bottom: 32,
    left: '10%',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
