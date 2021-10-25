import React,{useState, useEffect} from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import * as ExpoImagePicker from 'expo-image-picker'
import Icon from '../Icon'
import defaultStyles from '../../config/default.styles'
import colors from '../../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

/**select and remove image */

type ImageInputProps = {
    imageUri?: string, 
    onChangeImage: (image_url: any)=>void
    size?: number
}

export default function ImageInput({imageUri, onChangeImage, size = 150}: ImageInputProps) {

    const [didMount, setDidMount] = useState(false);

    async function requestPermission(){
        const { granted } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted)
        alert("You need to enable permission go to setting and enable it");
    };

    useEffect(() => {
        requestPermission();

        setDidMount(true);
        return () => setDidMount(false);
    }, []);

    if (!didMount) {
        return null;
    }

    function handlePress(){
        if (!imageUri) selectImage();
        else
        Alert.alert("Delete", "Are you sure you want delete this image", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            { text: "No" },
        ]);
    };

    async function selectImage(){
        try {
        const result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
            base64: true,
        });
        if (!result.cancelled) onChangeImage(result);
        } catch (error) {
        console.log("Error reading image", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.container, {width: size, height: size}]}>
                {!imageUri ? (
                    <MaterialCommunityIcons
                        name="camera"
                        size={40}
                        color={colors.medium_grey}
                    />
                ) : (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 20,
        overflow: "hidden"
    },
    image: {
        borderRadius: 15,
        width: "100%",
        height: "100%",
    }
})
