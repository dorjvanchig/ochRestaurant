import { isNullOrUndefined } from "./suuriKholbolt"
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash'
export function sagsniiMedeelelAvya() 
{
    let niitDun = global.buteegdekhuunSags.reduce((acc, pilot) => acc + (Number(pilot.too) * Number(pilot.negjUne)), 0);
    
    let utga = _.unionBy(global.buteegdekhuunSags, function (x) {
        return x.baiguullagaMedeelel?.baiguullagiinKhoch
    });
    let butsaakhUtga = {
        too: !isNullOrUndefined(global.buteegdekhuunSags) && global.buteegdekhuunSags.length > 0 ? global.buteegdekhuunSags.length : 0,
        niitDun: (!isNullOrUndefined(niitDun) || isNaN(niitDun)) ? niitDun : 0,
        baraanuud: global.buteegdekhuunSags,
        baiguullagaMedeelel:!isNullOrUndefined(utga) ? utga[0]?.baiguullagaMedeelel : undefined
    } 
    console.log('sagsniiMedeelelAvya', butsaakhUtga)
    return butsaakhUtga
}

export function delgrenguiMedeelleesSagsruuNemekh(ugugdul) {
    let index = global.buteegdekhuunSags.findIndex(a=> a.baarKodniiKhoch === ugugdul.baarKodniiKhoch)
    if (!isNullOrUndefined(index) && index > -1){
        global.buteegdekhuunSags[index].too += ugugdul.too
    }
    else {
        global.buteegdekhuunSags.push(ugugdul)
    }
}

export function sagsruuNemye(ugugdul, turul) 
{
    let index = global.buteegdekhuunSags.findIndex(a=> a.baarKodniiKhoch === ugugdul.baarKodniiKhoch)
    if (!isNullOrUndefined(index) && index > -1)
    {
        if (turul === "nemekh")
            global.buteegdekhuunSags[index].too += 1
        else if (turul === "khasakh")
        { 
            global.buteegdekhuunSags[index].too -= 1 
            if (global.buteegdekhuunSags[index].too < 1)
                global.buteegdekhuunSags[index].too = 1 
        }
    }
    else {
        ugugdul.too = 1
        global.buteegdekhuunSags.push(ugugdul)
    } 
}

export function sagsTseverley() {
    global.buteegdekhuunSags = []
}

export function songosonButeegdekhuunSagsnaasUstgay(ugugdul) 
{
    let index = global.buteegdekhuunSags.findIndex(a=> a.baarKodniiKhoch === ugugdul.baarKodniiKhoch)
    if (index > -1)
        global.buteegdekhuunSags.splice(index, 1)
}

export const setStoreData = (key, data) => {
    return new Promise((resolve) => {
        let utga = undefined
        if (typeof data === "object")
            utga = JSON.stringify(data)
        else 
            utga = data 
        AsyncStorage.setItem(key, utga).then(khariu=> {
            resolve(true) 
        })
    }) 
}

export const deleteStoreData = (key) => {
    return new Promise((resolve) => {
        AsyncStorage.removeItem(key).then(khariu=> {
            resolve(true) 
        }) 
    }) 
}

export const getStoreData = (key) => {
    return new Promise((resolve) => {
        AsyncStorage.getItem('khereglegch').then(khariu=>{
            if (typeof khariu === "string")
              resolve(JSON.parse(khariu))  
            else resolve(khariu) 
        })
    })
}