import React,{useState, useEffect} from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import * as ExpoImagePicker from 'expo-image-picker'
import Icon from '../Icon'
import defaultStyles from '../../config/default.styles'
import colors from '../../config/colors'

/**select and remove image */

type ImageInputProps = {
    addNextComonent: (image_info: ImageListInfo) => void//add the next comonent
    removeComponent: (image_uri: ImageListInfo) => void
    changeComponent: (image_uri: ImageListInfo)=>void
    item: ImageListInfo
}

export default function ImageInput({addNextComonent, removeComponent, changeComponent, item}: ImageInputProps) {

    const [image_uri,setImageUri] = useState<undefined| string>()

    async function requestPermission() {
        let permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }
        //let pickerResult = await ExpoImagePicker.launchImageLibraryAsync();
        //console.log(pickerResult);
        return
    }

    useEffect(() => {
        requestPermission();
    }, []);

    function add(info: ImageListInfo){
        addNextComonent(info)
    }
    
    function change(image_uri: string){
        changeComponent({key:item.key, uri:image_uri})
        setImageUri(image_uri)
    }
    
    function removeImageComponent(){   
        removeComponent(item) //: setImageUri(undefined)
        setImageUri(undefined)
    }

    async function openImageLibrary(){
        return await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
            //quality: 0.5
        })
    }

    async function selectImage(){
        try {
            const res = await openImageLibrary()//ExpoImagePicker.launchImageLibraryAsync({quality: 0.5})
            if(!res.cancelled){
                setImageUri(res.uri) 
                add({key:0, uri: res.uri})
            }else{
                console.log('cancell image')
            }
        } catch (error) {
            console.log('error reading an image')
        }
    
    }

    async function changeImage() {
        
        try {
            const res = await openImageLibrary()//ExpoImagePicker.launchImageLibraryAsync({quality: 0.5})
            if(!res.cancelled){
                setImageUri(image_uri) 
                change(res.uri)
            }else{
                console.log('cancell image')
            }
        } catch (error) {
            console.log('error reading an image')
        }
    }
  
    async function changeImageAlert() {
        Alert.alert(
            "Change Image?",
            "WHat do you want to do with the selected image?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: "cancel"
              },
              { text: "Remove", onPress: () => removeImageComponent() },
              { text: "Change", onPress: () => changeImage() }
            ]
          );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={!image_uri ? selectImage : changeImageAlert}>

            {   
                image_uri ? <Image style={styles.image} source={{uri: image_uri}} /> : //show image if tis availible
                
                <View style={styles.icon}> 
                    <Icon name={'camera'} background_color={colors.medium_grey}/>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 2,
        width: 150,
        height: 150,
        backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 20,
        overflow: "hidden"
    },
    image:{
        width: "100%",
        height: "100%"
    },
    icon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
