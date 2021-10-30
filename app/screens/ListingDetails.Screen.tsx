import { useRoute } from '@react-navigation/core';
import React from 'react'
import {  ImageSourcePropType, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText'
import ContactSellerForm from '../components/ContactSellerForm';
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import images from '../config/images'
import { ListingsDetailsSceenProps } from '../navigation/feed-navigation/types';

const ListingDetailsScreen = ({route}:ListingsDetailsSceenProps) => {
    
    const { images: remote_images, title, price, description } = route.params
    
    
    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
		    >
            <Image 
                style={styles.image} 
                uri={remote_images[0].url} 
                tint='light'
                preview={{uri : remote_images[0].thumbnailUrl}}
            />
            <View style={styles.details_container}>
                <AppText style={styles.title} text={title}/>
                <AppText style={styles.price} text={price.toString()}/>
                <AppText style={styles.description} text={description} />

                <View style={styles.user_container}>
                    <ListItem 
                        image={images.logo} 
                        title={"Hans Mbangu"} 
                        sub_title={"7 listings"} 
                    />
                </View>

                <ContactSellerForm listing={route.params}  />
                
            </View>

            </KeyboardAvoidingView>
        </ScrollView>
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
