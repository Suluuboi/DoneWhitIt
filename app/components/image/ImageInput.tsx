import React,{useState, useEffect} from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import * as ExpoImagePicker from 'expo-image-picker'
import Icon from '../Icon'

/**select and remove image */

export default function ImageInput() {

    const [image_uri, setImageUri] = useState<undefined| string>()

    async function requestPermission() {
        const {granted} = await ExpoImagePicker.requestMediaLibraryPermissionsAsync()
        
        if(!granted){
            alert('You need to allow camera permissins')
        }
    
    }

    async function selectImage(){
        try {
            const res = await ExpoImagePicker.launchImageLibraryAsync()
            !res.cancelled ? setImageUri(res.uri) : console.log('image selection cancelled by the user.')
        } catch (error) {
            console.log('error readind an image')
        }
        
    }

    async function changeImage() {
        Alert.alert(
            "Change Image?",
            "WHat do you want to do with the selected image?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: "cancel"
              },
              { text: "Remove", onPress: () => setImageUri(undefined) },
              { text: "Change", onPress: () => selectImage() }
            ]
          );
    }

    useEffect(() => {
        requestPermission();
     }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={!image_uri ? selectImage : changeImage}>

            {   
                image_uri ? <Image style={styles.image} source={{uri: image_uri}} /> : //show image if tis availible
                
                <View style={styles.icon}> 
                    <Icon name={'camera'}/>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: .5,
        width: 200,
        height: 200,
    },
    image:{
        width: 200,
        height: 200
    },
    icon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
