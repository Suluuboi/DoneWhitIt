import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import { ListingImageSceenProps } from '../navigation/feed-navigation/types';



export default function ViewImageScreen({route}:ListingImageSceenProps) {

    const {image_url:uri, handleLeftPress} =  route.params

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>

                <Image 
                    style={styles.image} 
                    source={{uri: uri}}
                />

                <View style={styles.buttons_row}>
                    <View style={styles.left_button}>
                        <TouchableWithoutFeedback onPress={handleLeftPress}>
                            <MaterialCommunityIcons name={"close"} color={colors.white} size={35}/>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <View style={styles.right_button}>
                        <TouchableWithoutFeedback>
                            <MaterialCommunityIcons name={"trash-can-outline"} color={colors.white} size={35}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                    
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#000"
    },
    buttons_row:{
        flexDirection:"row",
        justifyContent:"space-between",
        position: 'absolute',
        width: '100%'
    },
    left_button:{
        top:40,
        left:30,
        //position: "absolute"
    },
    right_button:{
        
        top:40,
        right:30,
        position: "absolute"
    },
    image:{
        width: "100%",
        height:"100%",
        resizeMode:"contain"
    }
})
