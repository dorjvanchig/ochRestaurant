import React from 'react'
import { Keyboard, View, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function DismissKeyboardView({children}) 
{
  return (<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex:1}}>
    <ScrollView>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
       </TouchableWithoutFeedback>
    </ScrollView>
  </KeyboardAvoidingView>)  
}