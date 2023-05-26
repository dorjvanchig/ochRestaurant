import { View, AppState, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import socialPay from '../../zurag/socialPay.jpg'
import qPay from '../../zurag/qpay.jpg'
import monpay from '../../zurag/monpay.jpg'
import bank from '../../zurag/bank.jpg'
import BottomSheet from '../components/bottomSheet';
import  * as Linking from 'expo-linking'
import { useRouter, Link } from "expo-router";
import { useSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import QpayBankniiJagsaalt from "./qpayBankniiJagsaalt";
import { axs_kholbolt, getStoreData, isNullOrUndefined, sagsniiMedeelelAvya, sagsTseverley } from "../components";
import ModalComponent from "../components/modalComponent";
import AsuultAsuulga from "../components/asuultAsuulga";

export default function TulburiinKhelber() {
  const router = useRouter()
  const { zakhialga } = useSearchParams();
  const [tulburiinMedeelel, setTulburiinMedeelel] = useState({
    qpayMedeelel:undefined
  })
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

  function songosonTurul(ugugdul) {
    let sagsanDakhiBaraa = sagsniiMedeelelAvya()
    getStoreData('khereglegch').then(khereglegch=>{
      axs_kholbolt('api/qpayNekhemjlekhUusgeye', {
        niitDun:sagsanDakhiBaraa.niitDun,
        tailbar: JSON.parse(zakhialga)?.zakhialgiinDugaar,
        qpayMerchant: sagsanDakhiBaraa?.baiguullagaMedeelel?.qpayMerchant, 
        qpayBankCode:sagsanDakhiBaraa?.baiguullagaMedeelel?.qpayBankCode, 
        qpayDansniiDugaar:sagsanDakhiBaraa?.baiguullagaMedeelel?.qpayDansniiDugaar, 
        qpayDansniiNer: sagsanDakhiBaraa?.baiguullagaMedeelel?.qpayDansniiNer
      }).then(khariu=>{
        console.log('khariu', khariu)
        tulburiinMedeelel.qpayMedeelel = khariu
        setTulburiinMedeelel({...tulburiinMedeelel})
        setTimeout(()=>  bottomSheetRef.current.open(), 300)
      })
    })
  }

  function deeplinking(sogosonBank) {
    Linking.openURL(sogosonBank.link)
  }

  function onRequestClose() 
  {
    sagsTseverley()
    router.push("/")
    setIsShow(false)
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
        <ScrollView style = {{flex:1, marginTop: 15}}> 
            {
                [{ner:'Дансаар төлөх', zuragZam:bank}, 
                {ner:'Qpay', zuragZam:qPay}, 
                {ner:'Monpay', zuragZam:monpay}, 
                {ner:'Social Pay', zuragZam:socialPay}]
                .map((ugugdul, muriinDugaar)=> 
                    <TouchableOpacity key={muriinDugaar} onPress={()=> songosonTurul(ugugdul)} style = {styles.tulburTile}>
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
        <TouchableOpacity onPress={()=> qpayTulburShalgaya()}>
          <TextUtga>{appStateVisible}</TextUtga>
        </TouchableOpacity>
        <BottomSheet
            sheetRef={bottomSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height = {Dimensions.get('window').height - 130}
            customStyles={{
            wrapper: {backgroundColor: "transparent"},
            draggableIcon: {backgroundColor: "#000"}}}
        > 
           <QpayBankniiJagsaalt tulburiinMedeelel = {tulburiinMedeelel} deeplinking = {deeplinking}/>
        </BottomSheet>
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
  