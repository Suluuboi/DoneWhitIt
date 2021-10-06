import React, { useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker';
import AppButton from '../AppButton';

export default function ImagePicker() {

    const [uri, setUri] = useState<string>()

    async function selectImage(){
        try {
            const res = await ExpoImagePicker.launchImageLibraryAsync()
            !res.cancelled ? setUri(res.uri) : console.log('image selection cancelled by the user.')
        } catch (error) {
            console.log('error readind an image')
        }
        
    }

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
