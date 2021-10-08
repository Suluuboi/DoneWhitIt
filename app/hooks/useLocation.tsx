import * as ExpoLocation from 'expo-location'
import { useEffect, useState } from 'react';

export default function useLocation(){

    const [location, setLocation] = useState()

    async function getLocation(){
        const {granted } = await ExpoLocation.requestForegroundPermissionsAsync();

        try{
            if(!granted) return
            const res = await ExpoLocation.getLastKnownPositionAsync()
            const loc = res?.coords         
            loc?.latitude
            loc?.longitude
            const l = {
                        'latitude' : loc?.latitude,
                        'longitude': loc?.longitude
            } as any
            setLocation(l)
        }catch(error){
            console.log(error);
        }
        
    }

    useEffect(() => {
        getLocation();
    }, [])

    return location

}