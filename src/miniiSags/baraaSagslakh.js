
import React, {useRef, useMemo, useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/statusBar";
import TextUtga from "../components/textUtga";
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';  
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';  
import { useRouter, useNavigation } from "expo-router"; 
import TooComponent from "../components/tooComponent"; 
import { axs_kholbolt, formatNumber, isNullOrUndefined, sagsniiMedeelelAvya, sagsruuNemye } from '../components';
import { getStoreData, songosonButeegdekhuunSagsnaasUstgay } from '../components/shigtgee';
import CheckBox from '../components/checkBox';
import BottomSheet from '../components/bottomSheet';
import BarCodeUnshuulakh from './barCodeUnshuulakh';
import TextInput from '../components/textTalbar';
import _ from 'lodash'

export default function BaraaSagslakh() {
  const router = useRouter()  
  const navigation = useNavigation()
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
    getStoreData('khereglegch').then(khariu=>{ 
        if (isNullOrUndefined(khariu))
        {
            navigation.navigate('nevtrekh')
            return
        }
        else {
            if ((isNullOrUndefined(barimt.bailguullagiinDugaar) || 
            barimt.bailguullagiinDugaar ==="") && barimt.nuatTulugch === "baiguullaga")
            {
                alert('dugaar oruulna uu')
                baiguullagaRef.current.open()
                return
            }
            bottomSheetRef.current.open() 
        } 
    })
  } 

  function tulburiinKhesegDuudakh() {
        let baraanuud = _.cloneDeep(barimt.baraanuud)
        baraanuud.forEach(a=> a.zurag = null)
        let param = {
                baiguullagiinKhoch: "5254914",
                shireeniiDugaar: barimt.shireeniiDugaar,
                khereglegchiinUtas: "88045424",
                niitDun: barimt.sagsMedeelel.niitDun,
                tuluv:1,
                turul:'pos',
                zakhialgiinDugaar: '15515',
                barimtiinZadargaa: baraanuud
        } 
        axs_kholbolt('api/zakhialgaBurtguulye', param).then(khariu =>{
            navigation.navigate('tulburTulukh')
            bottomSheetRef.current.close()
        })
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
        <TouchableOpacity style = {styles.header} onPress={()=> router.back()}>
            <View>
              <IconSimple name="arrow-left" size={18}/>
           </View>
            <TextUtga style = {styles.headerText}>Захиалга баталгаажуулах</TextUtga>
        </TouchableOpacity>  
        <ScrollView style = {{flex:1, paddingHorizontal:15, marginVertical: 25}}>
            <TextUtga style = {{fontSize: 16, fontWeight:'bold', marginBottom: 8}}>Бүтээгдэхүүн</TextUtga>
            {barimt.baraanuud.map((ugugdul, muriinDugaar)=>
                <View 
                    key={muriinDugaar}
                    style = {styles.zadargaa} 
                //onPress = {()=> router.push("/buteegdekhuunDelgerengui")}
                >
                    <View style = {{alignItems:'center', justifyContent:'center'}}>
                        <View style = {styles.zuragTouch}>
                            <Image
                                style={styles.logo}
                                source={{uri:ugugdul.zurag}}
                            />
                        </View>
                    </View>
                    <View style = {{position:'relative', marginLeft: 15}}>
                        <View style = {{paddingHorizontal: 5, paddingVertical:10}}> 
                            <TextUtga 
                                ellipsizeMode='tail' 
                                numberOfLines={2}  
                                style = {styles.textNer}>
                                {`${ugugdul.baarKodniiNer}`}
                            </TextUtga>
                            <TextUtga style = {{fontWeight: 'bold', fontSize: 18}}>{formatNumber(ugugdul.negjUne)}₮</TextUtga>
                        </View>
                        <View style = {{flexDirection:'row', alignItems:'center', width: Dimensions.get('screen').width - 150, justifyContent:'flex-start', marginTop: 8}}>
                            <TooComponent 
                                baraaToo = {ugugdul.too}
                                soligdsonTooAvya = {(too, turul)=> soligdsonTooAvya(too, turul, ugugdul)}
                            />
                             <TouchableOpacity 
                                style = {{position: 'absolute', 
                                    right: -5,
                                    width: 45, 
                                    height: 35,
                                    backgroundColor:'#FF6839',
                                    top: 4,
                                    borderTopLeftRadius: 21,
                                    borderBottomRightRadius: 10,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                                onPress = {()=> utsgay(ugugdul)}>
                                <IconMaterial name='delete-circle' color={"white"} style = {{marginTop: 5, marginLeft: 5}} size={25}/> 
                            </TouchableOpacity>
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
                style = {{backgroundColor:'#FF6839', alignItems:'center', borderRadius: 8, marginTop: 11, padding: 8, width: Dimensions.get('screen').width- 75, justifyContent:'center'}}>
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
            <BarCodeUnshuulakh 
                barimt = {barimt} 
                setBarimt = {setBarimt} 
                tulburiinKhesegDuudakh = {tulburiinKhesegDuudakh}
                bottomSheetRef = {bottomSheetRef}/>
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
        //width: Dimensions.get('screen').width-220,
        width: 85,
        borderRadius:45, 
        height: 85,
    }, 
    zuragTouch:{
        backgroundColor:'white', 
        padding:5, 
        marginLeft: 3,
        borderRadius:45, 
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
        backgroundColor:'#FF6839',
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
        backgroundColor:'#f0f6fb',
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
  