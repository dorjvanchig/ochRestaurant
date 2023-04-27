import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput, View } from 'react-native';

const TextTalbar = (props) => { 
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <TextInput 
            {...props}
        />
    </TouchableWithoutFeedback>
  );
};

export default TextTalbar