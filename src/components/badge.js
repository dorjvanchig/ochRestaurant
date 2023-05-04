import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ value, style = {top: -8, left: 30} }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Badge;
