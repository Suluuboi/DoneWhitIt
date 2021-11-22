import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Constants from 'expo-constants'

import colors from '../../config/colors';

/**Given an array of images Create Swipe through all the images */

const {width} = Dimensions.get('window')
const height = width * .9 //60%

type ImageSwiperType = {
    images      : any[]
    name        : string //the is the name under witch the images are stored in the array 
    viewImage   ?: (image_index: number)=>void
    goBack      ?: ()=>void
}

export default function ImageSwiper({images, name, viewImage, goBack}: ImageSwiperType) {

    const [selected, setSelected] = useState(0)

    function setSelectedIndex (event) {
        const contentOffset = event.nativeEvent.contentOffset;
        const viewSize = event.nativeEvent.layoutMeasurement;
    
        // Divide the horizontal offset by the width of the view to see which page is visible
        const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
        setSelected(selectedIndex)
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                style={styles.scroll}
                onMomentumScrollEnd={setSelectedIndex}
            >
                {
                    images.map((image_obj, index)=>{
                
                        return(
                            <TouchableWithoutFeedback 
                                onPress={()=>viewImage == undefined ? null: viewImage(index)}
                                key={image_obj[name]}
                            >
                                <Image 
                                    style={styles.image} 
                                    uri={image_obj[name]} 
                                    tint='light'
                                    preview={{uri : image_obj.thumbnailUrl}}
                                    
                                />
                            </TouchableWithoutFeedback>
                        )
                        
                    })
                }
            </ScrollView>

            <View style={styles.dots_container}>

                {
                    images.map((image_obj, i) => (
                        <View
                            style={[
                                styles.dot,
                                { opacity: i === selected ? 0.5 : 1 }
                            ]}
                            key={image_obj[name]}
                        />
                    ))
                }
            </View>

            <View style={styles.back_button}>
                <TouchableWithoutFeedback onPress={goBack}>
                    <MaterialCommunityIcons 
                        name={"arrow-left"} 
                        color={colors.white} 
                        size={35}
                    />
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width,
        height
    },
    scroll:{
        width,
        height
    },
    image:{
        width,
        height,
        resizeMode: 'cover'
    },
    dots_container: {
        position: "absolute",
        bottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    back_button:{
        position: 'absolute',
        top: Constants.statusBarHeight,
        left: 10
    }
})

//make sure array index is no less/bigger than the current array
function correctArrayIndex(array:any[],number: number){
    const last_index = (array.length - 1)
    const first_index = 0

    if (number > last_index) {
        return last_index
    }else if(number < first_index){
        return first_index
    }

    return number
}
