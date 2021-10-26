import { useRoute } from '@react-navigation/core';
import React from 'react'
import {  ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText'
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import images from '../config/images'
import { ListingsDetailsSceenProps } from '../navigation/feed-navigation/types';

const ListingDetailsScreen = ({route}:ListingsDetailsSceenProps) => {
    
    const {image_url, title, description, price, thumbnail_url} = route.params
    
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                uri={image_url} 
                tint='light'
                preview={{uri : thumbnail_url}}
            />
            <View style={styles.details_container}>
                <AppText style={styles.title} text={title}/>
                <AppText style={styles.price} text={price}/>
                <AppText style={styles.description} text={description} />

                <View style={styles.user_container}>
                    <ListItem 
                        image={images.logo} 
                        title={"Hans Mbangu"} 
                        sub_title={"7 listings"} 
                    />
                </View>
                
            </View>

            
            
        </View>
    )
}

export default ListingDetailsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        width: "100%",
        height: 300
    },
    details_container:{
        padding: 20
    },
    title:{
        fontSize: 24,
        fontWeight: "500"
    },
    price:{
        color: colors.secondary,
        fontWeight: "bold"
    },
    description: {
        top: 10,
        color: colors.medium_grey
    },
    user_container:{
        marginVertical: 30
    }

})
