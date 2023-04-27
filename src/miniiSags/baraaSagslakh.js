
import React, {useRef, useMemo, useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';  
import { useRouter } from "expo-router"; 
import TooComponent from "../components/tooComponent"; 
import { axs_kholbolt, formatNumber, isNullOrUndefined, sagsniiMedeelelAvya, sagsruuNemye } from '../components';
import { songosonButeegdekhuunSagsnaasUstgay } from '../components/shigtgee';
import CheckBox from '../components/checkBox';
import BottomSheet from '../components/bottomSheet';
import BarCodeUnshuulakh from './barCodeUnshuulakh';
import TextInput from '../components/textTalbar';

export default function BaraaSagslakh() {
  const router = useRouter()  
  const [barimt, setBarimt] = useState({
    nuatTulugch:'khuviKhun',
    bailguullagiinDugaar: '',
    shireeniiDugaar: undefined,
    baraanuud: [],
    sagsMedeelel:{}
  }) 

  const [nuatiinJagsaalt] = useState([{ner: "Хувь хүн", iconName:'check', turul:'khuviKhun' }, {ner:'Байгууллага', turul:'baiguullaga', iconName:'minus'}])
  const bottomSheetRef = useRef(null);
  const baiguullagaRef = useRef(null);

  function handlePresentModalPress() 
  {
    if ((isNullOrUndefined(barimt.bailguullagiinDugaar) || 
        barimt.bailguullagiinDugaar ==="") && barimt.nuatTulugch === "baiguullaga")
    {
        alert('dugaar oruulna uu')
        baiguullagaRef.current.open()
        return
    }
    bottomSheetRef.current.open()
    // let param = {
    //     barimt:{
    //         baiguullagiinKhoch: "5254914",
    //         shireeniiDugaar: 15,
    //         khereglegchiinUtas: "88045424",
    //         niitDun: 120000,
    //         tuluv:1,
    //         zakhialgiinDugaar: '15515'
    //     },
    //     barimtiinZadargaa: barimt.baraanuud
    // }
    // axs_kholbolt('api/zakhialgaBurtguulye', param).then(khariu =>{
    //     console.log("zakhailgaBurtguulye", khariu)
    // })
  } 
  useEffect(()=>
  {
    barimt.baraanuud = sagsniiMedeelelAvya().baraanuud
    barimt.sagsMedeelel = sagsniiMedeelelAvya()
    setBarimt({...barimt})
  }, [])

  function soligdsonTooAvya(too, turul, ugugdul) {
    sagsruuNemye(ugugdul, turul)
    barimt.sagsMedeelel = sagsniiMedeelelAvya()
    setBarimt({...barimt})
  }

  function utsgay(ugugdul) { 
    let index = barimt.baraanuud.findIndex(a=> a.baarKodniiKhoch === ugugdul.baarKodniiKhoch)
    if (index > -1)
        barimt.baraanuud.splice(index, 1)
    songosonButeegdekhuunSagsnaasUstgay(ugugdul) 
    barimt.sagsMedeelel = sagsniiMedeelelAvya()
    setBarimt({...barimt})
  }

  function nuatSolikh(ugugdul) {
    barimt.nuatTulugch = ugugdul.turul 
    if (ugugdul.turul === "baiguullaga")
        baiguullagaRef.current.open()
    else 
        barimt.bailguullagiinDugaar = ""
    setBarimt({...barimt})
  }
  function onChangeText(utga) {
    barimt.bailguullagiinDugaar = utga
    setBarimt({...barimt})
  }

  return (
    <View style={styles.container}>
        <CustomStatusBar/>
        <View style = {styles.header}>
            <TouchableOpacity onPress={()=> router.back()}>
              <IconSimple name="arrow-left" size={18}/>
           </TouchableOpacity>
            <TextUtga style = {styles.headerText}>Захиалга баталгаажуулах</TextUtga>
        </View>  
        <ScrollView style = {{flex:1, paddingHorizontal:15, marginVertical: 25}}>
                <TextUtga style = {{fontSize: 16, fontWeight:'bold', marginBottom: 8}}>Бүтээгдэхүүн</TextUtga>
                {barimt.baraanuud.map((ugugdul, muriinDugaar)=>
                    <View 
                        key={muriinDugaar}
                        style = {styles.zadargaa} 
                        //onPress = {()=> router.push("/buteegdekhuunDelgerengui")}
                        >
                        <Image
                            style={styles.logo}
                            source={require('../../zurag/yuna.jpg')}
                        />
                        <View style = {{position:'relative'}}>
                            <View style = {{paddingHorizontal: 15, paddingVertical:10}}>
                            <TouchableOpacity style = {{position:'absolute', top: 5, right:5}} 
                                onPress = {()=> utsgay(ugugdul)}>
                                <IconMaterial name='delete-circle' size={25} color = "#f66"/> 
                            </TouchableOpacity>
                                <TextUtga style = {{fontWeight: '400', fontSize: 17}}>{ugugdul.baarKodniiNer}</TextUtga>
                                <TextUtga style = {{fontWeight: 'bold', fontSize: 18}}>{ugugdul.une}₮</TextUtga>
                            </View>
                            <View style = {{flexDirection:'row', alignItems:'center', width: Dimensions.get('screen').width - 190, justifyContent:'flex-end', marginTop: 8}}>
                                <TooComponent 
                                    baraaToo = {ugugdul.too}
                                    soligdsonTooAvya = {(too, turul)=> soligdsonTooAvya(too, turul, ugugdul)}
                                />
                            </View>
                        </View>
                    </View>
                )} 
                <View style = {{marginTop: 15}}>
                    <TextUtga style = {{fontSize: 16, fontWeight:'bold', marginBottom: 8}}>НӨАТ барим</TextUtga>
                    <View>
                        { nuatiinJagsaalt.map((ugugdul,muriinDugaar) =>
                                <TouchableOpacity 
                                    key = {muriinDugaar} style = {[styles.khuvi, {backgroundColor:'#ededed'}]}
                                    onPress={()=> nuatSolikh(ugugdul)}
                                >
                                    <CheckBox checked = {ugugdul.turul === barimt.nuatTulugch}/>
                                    <TextUtga style = {{marginLeft: 8, fontSize: 16, fontWeight:'700'}}>{ugugdul.ner}</TextUtga>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
        </ScrollView> 
        <BottomSheet
            sheetRef={baiguullagaRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height = {200}
            customStyles={{
            wrapper: {backgroundColor: "transparent"},
            draggableIcon: {backgroundColor: "#000"}}}
        > 
             <TextInput 
                value = {barimt.bailguullagiinDugaar}
                onChangeText={(utga)=> onChangeText(utga)}
                style = {{borderRadius: 8, backgroundColor:'white', borderWidth: 1, borderColor:'#cecece', width: Dimensions.get('screen').width- 75, height: 45}}
                placeholder = "Байгууллагын регистр"
            />
             <TouchableOpacity 
                onPress={()=>{
                        if (isNullOrUndefined(barimt.bailguullagiinDugaar) || barimt.bailguullagiinDugaar === "")
                        {
                            alert('dugaar oruul')
                            return
                        }
                     baiguullagaRef.current.close()}}
                style = {{backgroundColor:'#f66', alignItems:'center', borderRadius: 8, marginTop: 11, padding: 8, width: Dimensions.get('screen').width- 75, justifyContent:'center'}}>
                <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>Үргэлжлүүл</TextUtga>
            </TouchableOpacity> 
        </BottomSheet>
        <BottomSheet
            sheetRef={bottomSheetRef}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height = {450}
            customStyles={{
            wrapper: {backgroundColor: "transparent"},
            draggableIcon: {backgroundColor: "#000"}}}
        > 
            <BarCodeUnshuulakh barimt = {barimt} setBarimt = {setBarimt} bottomSheetRef = {bottomSheetRef}/>
        </BottomSheet>
        <View style = {{backgroundColor:'white', height: 50, marginBottom: 25, alignItems:'center', justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={()=> handlePresentModalPress()} style = {styles.switch}>
                <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>{formatNumber(barimt.sagsMedeelel.niitDun)}₮</TextUtga>
                <TextUtga style = {{color:'white', fontSize: 18, fontWeight:'bold'}}>Үргэлжлүүлэх</TextUtga>
            </TouchableOpacity> 
        </View> 
    </View>
  );
}
const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('screen').width-220,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        height: 98,
    }, 
      sheetContainer: {
        // add horizontal space
        marginHorizontal: 24,
      },
      contentContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#efefef',
        paddingVertical: 8
      },
    khuvi:{
        padding:8,
        borderWidth:1,
        borderColor:'#ededed',
        marginTop: 5, 
        borderRadius:4,
        flexDirection:'row',
        marginLeft: 18
    },
    switch:{
        flexDirection:'row',  
        height: 50,
        borderRadius: 8,
        paddingHorizontal:10,
        width: Dimensions.get('screen').width - 75,
        backgroundColor:'#f66',
        alignItems:'center',
        justifyContent:'space-between', 
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }, 
    zadargaa:{
        flexDirection:'row',
        borderWidth:1,
        borderRadius:10, 
        borderColor:'#ededed',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 2, 
        marginTop: 5,
        height:105
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
  