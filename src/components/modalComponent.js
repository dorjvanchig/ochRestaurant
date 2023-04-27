import { View, Modal, StyleSheet, Dimensions } from 'react-native'
import TextUtga from './textUtga';
import IconAnt from 'react-native-vector-icons/AntDesign';  

export default function ModalComponent(props) 
{
    return (<View style = {styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            {...props}
        >
            <View style={styles.centeredView}>  
                <View style={styles.modalView}>
                    <View style = {styles.header}>
                        <TextUtga style= {styles.headerText}>header</TextUtga>
                        <IconAnt name='closecircleo' size={18} style = {{color:'red'}}/>
                    </View>
                    {props.children}
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
    headerText:{
        fontSize: 15,
        fontWeight:'500',
    },
    header:{
        height:35, 
        flexDirection:'row',
        paddingHorizontal:15,
        width: Dimensions.get('screen').width - 65,
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#ededed'
    },
    modalView: {
      height:Dimensions.get('screen').height - 150,
      backgroundColor: 'white',
      borderRadius: 10, 
      alignItems: 'center', 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    }, 
  });