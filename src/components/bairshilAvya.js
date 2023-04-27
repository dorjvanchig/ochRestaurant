import * as Location from 'expo-location';

export function uuriinBairshilAvakh() {
    return new Promise(function (resolve, reject) {
        bairshilAvya(resolve);
    }); 
}

export const bairshilAvya = async (resolve) => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        let location = null
        let tokhirgoo = {maximumAge: 10000}
        if(Platform.OS == 'ios') {
          tokhirgoo = {
            enableHighAccuracy: false,
            timeInterval: 300, 
            distanceInterval: 0,
            timeout: 10000,
            maximumAge: 10000,
            accuracy: Location.Accuracy.Balanced,
          }
        } 

        const current = await Location.getCurrentPositionAsync(tokhirgoo)
        if(current) {
            location = current
        } else 
            Location.getLastKnownPositionAsync(tokhirgoo).then((last) => { location = last }) 
        resolve(location.coords)
    } catch (error) {
        alert(error.message);
    }
};