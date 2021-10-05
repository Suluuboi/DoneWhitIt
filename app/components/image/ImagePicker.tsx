import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'


import CustomSafeAreaView from '../CustomSafeAreaView'
import AppButton from '../AppButton';
import Icon from '../Icon';
import ListItem from '../ListItem';

export default function ImagePicker() {

    const [uri, setUri] = useState<string| undefined>()

    async function requestPermission() {
        const {granted} = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
        //const {} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.LOCATION_FOREGROUND)
        
        if(!granted){
            alert('you need to enablle camera permissins')
        }
    
    }

    async function selectImage(){
        try {
            const res = await ExpoImagePicker.launchImageLibraryAsync()
            !res.cancelled ? setUri(res.uri) : console.log('image selection cancelled by the user.')
        } catch (error) {
            console.log('error readind an image')
        }
        
    }

    useEffect(() => {
       requestPermission();
    }, [])

    return (
        <View style={styles.container}>
            {uri ? <AppButton text={'Change Image'} onPress={selectImage}/> : <AppButton text={'Select Image'} onPress={selectImage} /> }
            {uri && <Image source={{uri: uri }} style={{width:200, height: 200, alignSelf:"center"}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})
