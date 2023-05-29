import { View, AppState, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';   
import  * as Linking from 'expo-linking'
import { useRouter, Link } from "expo-router";
import { useSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { axs_kholbolt, isNullOrUndefined, sagsniiMedeelelAvya, sagsTseverley } from "../components";
import AsuultAsuulga from "../components/asuultAsuulga";
import TabsView from "../components/tabsView";
import BankniiShiljvvleg from "./bankniiShiljvvleg";
import AppTulukh from "./appTulukh";

export default function TulburiinKhelber() {
  const router = useRouter()
  const { zakhialga, tuluugviBarimtEsekh } = useSearchParams();
  const [tulburiinMedeelel, setTulburiinMedeelel] = useState({
    qpayMedeelel:undefined
  })
  const [sagsMedeelel, setSagsMedeelel] = useState(undefined)
  const [isShow, setIsShow] = useState(false)
  const bottomSheetRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  function qpayTulburShalgaya() {
    let khadgalsanZakhialga = JSON.parse(zakhialga)
    let param = {id:khadgalsanZakhialga._id, invoice_id:tulburiinMedeelel.qpayMedeelel?.invoice_bank_accounts[0].invoice_id}
    axs_kholbolt('api/qpayTulburShalgaya', param)
    .then(khariu=>{
      console.log('qpayTulburShalgaya', khariu)
      if (!isNullOrUndefined(khariu) && khariu == "Amjilt")
        setIsShow(true) 
    })
  }

  useEffect(() => {
    if (!isNullOrUndefined(tuluugviBarimtEsekh) && tuluugviBarimtEsekh)
    {
      let object = JSON.parse(zakhialga)
      let sags = {baiguullagaMedeelel: object?.restaurant, niitDun: object.barimt?.niitDun, zakhialgiinDugaar: object.barimt?.zakhialgiinDugaar}
      setSagsMedeelel({...sags})
    }
    else 
    {
      let sagsMedelel = sagsniiMedeelelAvya()
      sagsMedelel.zakhialgiinDugaar = JSON.parse(zakhialga)?.zakhialgiinDugaar,
      setSagsMedeelel({...sagsMedelel})
    }
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current); 
    });

    return () => {
      subscription.remove();
    };
  }, []); 

  useEffect(()=>{ 
    if (appStateVisible === "active")
      qpayTulburShalgaya()
  }, [appStateVisible])

  function deeplinking(sogosonBank) {
    Linking.openURL(sogosonBank.link)
  }

  function onRequestClose() 
  {
    sagsTseverley()
    router.push("/")
    setIsShow(false)
  }

  function tabsOnChange() 
  {
    
  }
  return (
    <View style={styles.container}>
        <CustomStatusBar/>
        <View style = {styles.header}>
            <TouchableOpacity onPress={()=> router.back()}>
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>Төлбөр төлөх</TextUtga>
        </View> 
        <View style = {{height:Dimensions.get('window').height -110}}>
          <TabsView 
            activeKey = {0}
            onChange = {()=> tabsOnChange()}
            tabs = {
              [
                {key: 0, label: 'Шилжүүлгээр', children: <BankniiShiljvvleg sagsMedeelel = {sagsMedeelel} />},
                {key: 1, label: 'Апп-аар', children: <AppTulukh deeplinking = {deeplinking} tulburiinMedeelel = {tulburiinMedeelel} setTulburiinMedeelel = {setTulburiinMedeelel} sagsMedeelel = {sagsMedeelel}/>}
              ]
            }
          
          />
        </View> 
        <AsuultAsuulga onRequestClose = {onRequestClose} visible = {isShow}/>
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
      backgroundColor: '#f9f9f9', 
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
      backgroundColor:'#f9f9f9',
      alignItems:'center', 
      flexDirection:'row', 
    }
  });
  