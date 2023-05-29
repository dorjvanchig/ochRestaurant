import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView} from "react-native";
import { axs_kholbolt, getStoreData, isNullOrUndefined } from "../components";
import CustomStatusBar from "../components/statusBar";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import TextUtga from "../components/textUtga";
import { useNavigation, useRouter } from "expo-router";
import dayjs from 'dayjs'
export default function TulburKhuleegdsenBarimt(props) 
{
    const router = useRouter()
    const navigation = useNavigation()
    const [barimtState, setBarimtState] = useState({})
    useEffect(()=>{
        uilchilgeeDuuday()
    }, [])

    function uilchilgeeDuuday() {
        getStoreData('khereglegch').then(local=>{ 
            console.log('local', local)
            axs_kholbolt('api/sagsandBaigaaZakhialgaAvya', {khereglegchiinUtas: local?.utas}).then(khariu =>{
                console.log('sagsandBaigaaZakhialgaAvya', khariu)
                if (!isNullOrUndefined(khariu))
                    setBarimtState({...khariu})
                else setBarimtState({})

            })
        })
    }

    function songosonTurul() 
    {
        navigation.navigate('tulburTulukh', {zakhialga: JSON.stringify(barimtState), tuluugviBarimtEsekh: true})
    }

    return (<View style={styles.container}>
        <CustomStatusBar/>
        <View style = {styles.header}>
            <TouchableOpacity onPress={()=> router.back()}>
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>Захиалгууд</TextUtga>
        </View>
        <ScrollView style = {{flex:1, marginTop: 15}}> 
            { 
                <TouchableOpacity
                    onPress={()=> songosonTurul()} style = {styles.tulburTile}>
                    <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <TextUtga style = {{marginLeft: 0, color:'#6e6e6e'}}>Захиалга</TextUtga>
                        <TextUtga style = {{fontSize: 18, color:'#FF6839'}}>Төлбөр хүлээгдэж байгаа</TextUtga>
                    </View> 
                    <View style = {{flexDirection:'row', marginTop: 8, alignItems:'center', justifyContent:'space-between'}}>
                        <TextUtga style = {{color:'#6e6e6e'}}>Захиалгын дугаар</TextUtga>
                        <TextUtga style = {{marginLeft: 15, fontWeight:'bold' }}>#{barimtState?.barimt?.desDugaar}</TextUtga>
                    </View>
                    <View style = {{flexDirection:'row', marginTop: 8, alignItems:'center', justifyContent:'space-between'}}>
                        <TextUtga style = {{color:'#6e6e6e'}}>Огноо:</TextUtga>
                        <TextUtga style = {{marginLeft: 15}}>{dayjs(barimtState?.barimt?.zakhialsanOgnoo).format('YYYY-MM-DD:HH:mm')}</TextUtga>
                    </View>
                </TouchableOpacity> 
            }
        </ScrollView>  
    </View>)    
    
}
const styles = StyleSheet.create({
    tulburTile:{ 
        borderWidth:1,
        borderColor:'#FF6839',
        marginTop: 8,
        padding:8, 
        backgroundColor:'#ff6a3b2e',
        flexDirection:'column', 
        marginHorizontal: 8, 
        paddingHorizontal: 8,
        borderRadius: 5,   
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