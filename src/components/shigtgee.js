import { isNullOrUndefined } from "./suuriKholbolt"

export function sagsniiMedeelelAvya() 
{
    let niitDun = global.buteegdekhuunSags.reduce((acc, pilot) => acc + (Number(pilot.too) * Number(pilot.une)), 0);
    return {
        too: !isNullOrUndefined(global.buteegdekhuunSags) && global.buteegdekhuunSags.length > 0 ? global.buteegdekhuunSags.length : 0,
        niitDun: (!isNullOrUndefined(niitDun) || isNaN(niitDun)) ? niitDun : 0,
        baraanuud: global.buteegdekhuunSags
    } 
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

export function songosonButeegdekhuunSagsnaasUstgay(ugugdul) 
{
    let index = global.buteegdekhuunSags.findIndex(a=> a.baarKodniiKhoch === ugugdul.baarKodniiKhoch)
    if (index > -1)
        global.buteegdekhuunSags.splice(index, 1)
}