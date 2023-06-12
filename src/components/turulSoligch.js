import { View, TouchableOpacity, StyleSheet } from 'react-native' 
import TextUtga from './textUtga';

export default function TurulSoligch(props) {
    const { turulSolikh, state, jagsaalt} = props
    return (
        <View style = {styles.switch}>
            {
                jagsaalt.map((ugugdul, muriinDugaar)=>
                { 
                    return(<TouchableOpacity 
                            key={muriinDugaar}
                            style = {[ugugdul.ner === jagsaalt[0].ner ? styles.btn1 : styles.btn2,
                            {
                                backgroundColor: state.turul == ugugdul.ner ? "#FF6839" : 'white',
                                borderWidth: state.turul != ugugdul.ner  ? 1 : 0, borderColor:'#ddd9d9'
                            }]} 
                            onPress = {()=> turulSolikh(ugugdul.ner)}
                        >
                        <TextUtga style = {{color:state.turul != ugugdul.ner ? '#8d8d8d' : 'white'}}>
                            {ugugdul.icon}
                        </TextUtga>
                        <TextUtga 
                            style = {{marginLeft:5, color:state.turul !== ugugdul.ner ? '#8d8d8d' : 'white', fontWeight:'bold'}}
                        >
                            {ugugdul.ner}
                        </TextUtga> 
                    </TouchableOpacity>)}
                ) 
            } 
        </View>
    ) 
}

const styles = StyleSheet.create({
    btn1:{
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15, 
      height:35, 
      width:150, 
      flexDirection:'row',
      alignItems:'center', 
      justifyContent:'center'
    },
    btn2:{
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15, 
      flexDirection:'row',
      height:35, 
      width:150, 
      alignItems:'center', 
      justifyContent:'center'
    },
    switch:{ 
      flexDirection:'row',  
      height: 55,
      alignItems:'center',
      justifyContent:'center',
      //position:'absolute',
    //   top:88,
    //   left:35,
      zIndex:1,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }, 
  });