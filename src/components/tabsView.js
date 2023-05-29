import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native'; 
import TextUtga from './textUtga';

const TabsView = (props) => {
  const { tabs, tabsOnChange, activeKey } = props
  const [activeTab, setActiveTab] = useState(activeKey);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    if (tabsOnChange)
        tabsOnChange(index)
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              //activeTab === index && styles.activeTab,
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, {color:activeTab === index ? '#fb3131': '#919191'}]}>{tab.label}</Text>
            <View style ={[activeTab === index && styles.activeTab]}>
            </View>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 100, 200],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
        {tabs[activeTab]?.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:55,
    paddingVertical: 20,
    marginHorizontal: 11, 
  },
  tabs: {
    backgroundColor:'#ededed',
    flexDirection: 'row', 
    alignItems: 'center',  
    borderRadius: 15, 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 18, 
   
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#fb3131', 
    borderRadius: 50,
    width: 60
  },
  tabText: {
    fontSize: 16,
    padding: 15,
    fontWeight:'500'
  },
  slider: {
    position: 'absolute',
    height: 3, 
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 

export default TabsView;
