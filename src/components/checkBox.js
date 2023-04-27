import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/Entypo';  

export default function CheckBox ({ onChange, checked }){ 
  const handlePress = () => {
    const newChecked = !checked;
    if (onChange){
        onChange(newChecked);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: checked ? '#1677ff' : '#d9d9d9',
            backgroundColor: checked ? '#1677ff' : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}
        >
          {checked && (
            <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <IconAntDesign name='check'  
                    color={"white"} size = {15}
                /> 
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
