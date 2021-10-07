import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'; 

/** Get the current device Location */

export default function GetMyLocation() {

    const [location, setLocation] = useState()

    async function getLocation(){
        const {granted } = await Location.requestForegroundPermissionsAsync();
        if(!granted) return
        const res = await Location.getLastKnownPositionAsync()
        const loc = res?.coords         
        loc?.latitude
        loc?.longitude
        const l = {
                    'latitude' : loc?.latitude,
                    'longitude': loc?.longitude
        } as any
        setLocation(l)
    }

    useEffect(() => {
        getLocation();
    }, [])

    return (
        <View>
            {location && <Text>{JSON.stringify(location, null, '\t')}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({})
