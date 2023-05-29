import axios from 'axios';
import axiosCancel from "axios-cancel";  
import { isObject } from 'lodash'
import { getStoreData } from './shigtgee';

axiosCancel(axios)
var serveriinMedeelel = "192.168.100.54:8000";
// var serveriinMedeelel = "192.168.100.47:8000";

export const axs_kholbolt = (uilchilgeeniiNer, damjuulakhUtga, fileTokhirgoo, khuleekhKhugatsaa) => {
    return new Promise(function (resolve, reject) {
        axs_kholboltEkhluulekh(uilchilgeeniiNer, damjuulakhUtga, fileTokhirgoo, khuleekhKhugatsaa, resolve);
    });
};

const axs_kholboltEkhluulekh = (uilchilgeeniiNer, damjuulakhUtga, fileTokhirgoo, khuleekhKhugatsaa, resolve) => {
    getStoreData('khereglegch').then(khereglegch =>{
        let baseURL = `http://${serveriinMedeelel}/${uilchilgeeniiNer}`; 
        let isString = (typeof damjuulakhUtga) === 'string';
        let contentType = isString ? 'text/plain; charset=utf-8' : (fileTokhirgoo === true) ? 'multipart/form-data' : 'application/json; charset=utf-8';
        let option = {
            headers: {
                "Cache-Control": "no-cache",
                "Accept": "application/json",
                "Content-Type": `${contentType}`,
                "Authorization": `Bearer ${khereglegch?.token}`, 
            },
            timeout: fileTokhirgoo ? 3000000 : isNullOrUndefined(khuleekhKhugatsaa) ? 30000 : khuleekhKhugatsaa,
        };
    
        if (objectEsekh(fileTokhirgoo)) option = { ...option, ...fileTokhirgoo };
        
        if (damjuulakhUtga === null || damjuulakhUtga === undefined || damjuulakhUtga === "") damjuulakhUtga = " "; 
        axios.post(baseURL, isString || fileTokhirgoo == true ? damjuulakhUtga : JSON.stringify(damjuulakhUtga), option)
        .then((response) => { 
            resolve(response.data.data); 
        })
        .catch((error) => {
            let aldaa = !isNullOrUndefined(error.response?.data?.aldaa) ? error.response?.data?.aldaa : error.response?.data?.error
            alert(JSON.stringify(aldaa)+"aldaa") 
        });
    }) 
};

export function objectEsekh(value) {
    return isObject(value)
}

export function isNullOrUndefined(value) {
    return value === null || value === undefined
}

export const formatNumber = (num) => {
    if(num === undefined) return '0';
    if(num === null && num === '') return '';
    var fixedNum = Number(num).toFixed(2).toString()
    var numSplit = fixedNum.split(".");
    if(numSplit === null || numSplit.length === 0){
        return "0";
    }     
    var firstFormatNum = numSplit[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if(numSplit.length > 1 && Number(numSplit[1]) > 0){
        firstFormatNum = firstFormatNum + '.' + numSplit[1];
    }
    return firstFormatNum;
}