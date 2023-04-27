import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import socialPay from '../../zurag/socialPay.jpg'
import qPay from '../../zurag/qpay.jpg'
import monpay from '../../zurag/monpay.jpg'
import bank from '../../zurag/bank.jpg'

import { useRouter, Link } from "expo-router";
import { useSearchParams } from "expo-router";

export default function TulburiinKhelber() {
  const router = useRouter()
  const { user, extra } = useSearchParams();
  console.log(user, extra, router)
  return (
    <View style={styles.container}>
        <CustomStatusBar/>
        <View style = {styles.header}>
            <TouchableOpacity onPress={()=> router.back()}>
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>Төлбөр төлөх</TextUtga>
        </View>
        <ScrollView style = {{flex:1, marginTop: 15}}> 
            {
                [{ner:'Дансаар төлөх', zuragZam:bank}, 
                {ner:'Qpay', zuragZam:qPay}, 
                {ner:'Monpay', zuragZam:monpay}, 
                {ner:'Social Pay', zuragZam:socialPay}]
                .map((ugugdul)=> 
                    <TouchableOpacity style = {styles.tulburTile}>
                        <View style = {{flexDirection:'row', alignItems:'center'}}>
                            <Image
                                style={styles.logo}
                                source={ugugdul.zuragZam}
                                alt = "as"
                            />
                            <TextUtga style = {{marginLeft: 15}}>{ugugdul.ner}</TextUtga>
                        </View>
                        <IconSimple name="arrow-right"/>
                    </TouchableOpacity>
                )
            }
        </ScrollView> 
    </View>
  );
}
const styles = StyleSheet.create({
    tulburTile:{ 
        marginTop: 10, 
        height: 45, 
        paddingHorizontal: 25,
        backgroundColor:'white',
        flexDirection:'row', 
        marginHorizontal: 15, 
        borderRadius: 5, 
        alignItems:'center', 
        justifyContent:'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    logo:{ 
        width: 35,
        height: 35,
    },
    container: {
      flex: 1, 
      backgroundColor: 'white', 
    },   
    headerText:{
      fontSize:15,
      fontWeight:'700',
      marginLeft: 10
    },
    header:{
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor:'white',
      alignItems:'center', 
      flexDirection:'row',
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }
  });
  