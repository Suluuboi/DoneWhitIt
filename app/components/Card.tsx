import React from 'react'
import { View, StyleSheet,  TouchableOpacity } from 'react-native'
import { Image } from 'react-native-expo-image-cache';


import colors from '../config/colors';
import AppText from './AppText';

type CardProps = {
    image_url    : string,
    thumbnail_url: string,
    title       : string,
    sub_title   : string,
    onPress?    : ()=>void
}

export default function Card({image_url, title, sub_title, thumbnail_url , onPress}: CardProps) {
    return (
        <TouchableOpacity 
            style={styles.card_container}
            onPress={onPress}
        >

            <Image 
                //resizeMode={"cover"} 
                style={styles.image} 
                uri={image_url}
                preview={{uri : thumbnail_url}} 
                tint='light'
                //onProgress={}
            />

            <View style={styles.text_container}>
                <AppText style={styles.title} text={title}/>
                <AppText style={styles.sub_title} text={sub_title}/>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card_container:{
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden'
    },
    image:{
        width:"100%",
        height: 200,
        //resizeMode: "cover"
    },
    text_container:{
        padding: 10
    },
    title:{
        fontSize:24
    },
    sub_title:{
        color: colors.secondary,
        fontWeight: "bold"
    }
})

