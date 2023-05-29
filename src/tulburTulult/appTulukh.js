import { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Clipboard, Image, TouchableOpacity} from 'react-native'
import { axs_kholbolt, formatNumber } from '../components'
import TextUtga from '../components/textUtga'

export default function AppTulukh(props) 
{
    const { sagsMedeelel, tulburiinMedeelel, setTulburiinMedeelel, deeplinking } = props

    useEffect(()=>{
          axs_kholbolt('api/qpayNekhemjlekhUusgeye', {
            niitDun:sagsMedeelel?.niitDun,
            tailbar: sagsMedeelel?.zakhialgiinDugaar,
            qpayMerchant: sagsMedeelel?.baiguullagaMedeelel?.qpayMerchant, 
            qpayBankCode:sagsMedeelel?.baiguullagaMedeelel?.qpayBankCode, 
            qpayDansniiDugaar:sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiDugaar, 
            qpayDansniiNer: sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiNer
          }).then(khariu=>{
            tulburiinMedeelel.qpayMedeelel = khariu
            setTulburiinMedeelel({...tulburiinMedeelel}) 
          })
    }, [sagsMedeelel])
   
    return (
        <View style = {styles.container}>
        <ScrollView style = {styles.root}>
            <View style = {{marginTop: 15, alignItems:'center'}}> 
                <TextUtga style = {{fontSize: 15, fontWeight:'500'}}>Төлөх дүн</TextUtga>
            </View>
            <View style = {{marginTop:15, alignItems:'center'}}>
                <TextUtga style = {styles.dunText}>{formatNumber(sagsMedeelel?.niitDun)} ₮</TextUtga>
            </View>
            <View style = {{marginTop:15, alignItems:'center'}}>
                <TextUtga style = {styles.text1}>Банкны апп-аар</TextUtga>
            </View>
        <View style = {{borderWidth:1, borderColor:'#ededed', borderRadius: 8, paddingHorizontal:5, paddingVertical: 15, marginTop: 10}}>
           <ScrollView>
                {
                tulburiinMedeelel.qpayMedeelel?.urls?.map((ugugdul, muriinDugaar)=>
                    <TouchableOpacity 
                      onPress={()=> deeplinking(ugugdul)}
                      key={muriinDugaar} 
                      style = {{flexDirection:'row', alignItems:'center', padding: 5, backgroundColor:'white', marginTop: 8, borderRadius: 8}}>
                      <Image source={{uri: ugugdul.logo}}
                          style={{width: 50, height: 50, borderRadius: 8}} />
                      <View style = {{paddingHorizontal: 15}}>
                        <TextUtga style = {{fontSize: 15, fontWeight: '400'}}>{ugugdul.description}</TextUtga>
                      </View>
                    </TouchableOpacity>
                  )
                }
           </ScrollView>
        </View>
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
    },
    text1:{ 
        fontSize: 18,
        fontWeight: '500'
    },
    dunText:{
        fontSize: 35,
        fontWeight:'bold',
        color:'#fb3131'
    },
    khuvaalt:{
        paddingHorizontal: 3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop: 18,
        backgroundColor:'#f7f7f7f5'
    }
})