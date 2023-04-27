import React from 'react'
import {StyleSheet, View} from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
export default function BottomSheet(props) 
{
  
  return (  <RBSheet
                ref = {props.sheetRef}
                {...props}
                closeOnDragDown={true}
                closeOnPressMask={false} 
                customStyles={{
                    wrapper: {backgroundColor: "#32323285"},
                    draggableIcon: {backgroundColor: "#000"},
                    container:{shadowColor: '#171717', shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.1, shadowRadius: 2, }
                }}
            >
                <View style={styles.contentContainer}>
                    {props.children}
                </View>
            </RBSheet>)
}

const styles = StyleSheet.create({ 
      contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#efefef',
        paddingVertical: 8
      }, 
  });