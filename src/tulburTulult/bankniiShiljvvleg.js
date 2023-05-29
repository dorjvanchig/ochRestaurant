import { View, ScrollView, StyleSheet, Clipboard, Alert, TouchableOpacity} from 'react-native'
import { formatNumber } from '../components'
import TextUtga from '../components/textUtga'

export default function BankniiShiljvvleg(props) 
{
    const { sagsMedeelel } = props

    const handleCopy = async (turul) => { 
        try {
            if (turul === "utga")
                await Clipboard.setString(sagsMedeelel?.zakhialgiinDugaar);    
            else if (turul === "dansDugaar")
                await Clipboard.setString(sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiDugaar);
            else if (turul === "dansniiNer")
                await Clipboard.setString(sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiNer);
            } catch (error) {
        }
    };
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
                <TextUtga style = {styles.text1}>Банкны шилжүүлгээр</TextUtga>
            </View>
        <View style = {{borderWidth:1, borderColor:'#ededed', borderRadius: 8, paddingHorizontal:5, paddingVertical: 15, marginTop: 10}}>
            <View style = {styles.khuvaalt}>
                <View style = {{flexDirection:'column'}}>
                    <TextUtga style = {{fontSize: 15, color:'#919191'}}>Гүйлгээний утга</TextUtga>
                    <TextUtga numberOfLines={1} ellipsizeMode='head' style = {{fontSize: 18, width: 250, fontWeight: '600', color:'#5e5e5e', marginTop: 5}}>{sagsMedeelel?.zakhialgiinDugaar}</TextUtga>
                </View>
                <TouchableOpacity onPress={()=> handleCopy('utga')} style = {{padding:10, backgroundColor:'#ebebeb', borderRadius: 8}}>
                    <TextUtga style = {{fontSize: 16, fontWeight: '600'}}>Хуулах</TextUtga>
                </TouchableOpacity>
            </View>
            <View style = {styles.khuvaalt}>
                <View style = {{flexDirection:'column'}}>
                    <TextUtga style = {{fontSize: 15, color:'#919191'}}>Дансны дугаар</TextUtga>
                    <TextUtga style = {{fontSize: 18, fontWeight: '600', color:'#5e5e5e', marginTop: 5}}>{sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiDugaar}</TextUtga>
                </View>
                <TouchableOpacity onPress={()=> handleCopy('dansDugaar')} style = {{padding:10, backgroundColor:'#ebebeb', borderRadius: 8}}>
                    <TextUtga style = {{fontSize: 16, fontWeight: '600'}}>Хуулах</TextUtga>
                </TouchableOpacity>
            </View>
            <View style = {styles.khuvaalt}>
                <View style = {{flexDirection:'column'}}>
                    <TextUtga style = {{fontSize: 15, color:'#919191'}}>Дансны нэр</TextUtga>
                    <TextUtga style = {{fontSize: 18, fontWeight: '600', color:'#5e5e5e', marginTop: 5}}>{sagsMedeelel?.baiguullagaMedeelel?.qpayDansniiNer}</TextUtga>
                </View>
                <TouchableOpacity onPress={()=> handleCopy('dansniiNer')} style = {{padding:10, backgroundColor:'#ebebeb', borderRadius: 8}}>
                    <TextUtga style = {{fontSize: 16, fontWeight: '600'}}>Хуулах</TextUtga>
                </TouchableOpacity>
            </View>
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