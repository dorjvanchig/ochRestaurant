import { View, Modal, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import TextUtga from './textUtga';
import IconAnt from 'react-native-vector-icons/AntDesign';  

export default function AsuultAsuulga(props) 
{
    const { onRequestClose } = props
    return (<View style = {[styles.centeredView, {position:'relative'}]}>
        <Modal
            animationType="fade"
            transparent={true} 
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}
            {...props}
        >
            <View style={[styles.centeredView, {backgroundColor:'#6262625c'}]}>  
                 <View style = {styles.logo}>
                    <View style ={styles.logoContent}>
                        <IconAnt name='check' size={35} color = "#27a644"/>
                    </View>
                 </View>
                <View style={styles.modalView}>
                    <View style = {{flex: 0.8, display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <View style= {styles.headerText}>
                            <TextUtga style = {{fontSize: 20}}>Амжилттай</TextUtga>
                        </View>
                        <TextUtga style = {{fontSize: 18, marginTop: 18, textAlign:'center'}}>
                            Төлбөр төлөлт амжилттай хийгдлээ.
                        </TextUtga>
                    </View>
                    <View style = {{flex: 0.2, display:'flex', alignItems:'flex-end', justifyContent:'flex-end', paddingVertical: 25}}>
                        <TouchableOpacity onPress = {()=> onRequestClose && onRequestClose()} style = {[styles.bottom]}>
                            <TextUtga style = {styles.textBottom}>Хаах</TextUtga>
                        </TouchableOpacity>
                    </View>
                </View> 
            </View>
        </Modal>
    </View>)    
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center', 
    },
    bottom:{
        backgroundColor:'#27a644', 
        width:200,  
        height: 45,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 8
    },
    textBottom:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },
    headerText:{
        fontSize: 15,
        fontWeight:'500',
        marginTop: 55,
        
    },
    logo:{
        width:130,
        height:130,
        borderRadius: 150,
        position:'absolute',
        top:150,
        zIndex:9999,
        backgroundColor:'#27a644',
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        borderWidth:2, 
        borderColor:'white'
    },
    logoContent:{
        backgroundColor:'white',
        width:50,
        height:50,
        borderRadius: 50,
        alignItems:'center',
        display:'flex',
        justifyContent:'center'
    },
    modalView: {
      height:Dimensions.get('window').height - 425,
      width:Dimensions.get('window').width - 70,
      backgroundColor: 'white',
      borderRadius: 25, 
      alignItems: 'center', 
      paddingHorizontal: 20,
    }, 
  });