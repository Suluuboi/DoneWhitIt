import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react'
import {  ImageSourcePropType, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { shadow } from 'react-native-paper';

import AppText from '../components/AppText'
import ContactSellerForm from '../components/ContactSellerForm';
import { MaterialCommunityIconsSet } from '../components/icon/types';
import ImageSwiper from '../components/image/ImageSwiper';
import ImageViewer from '../components/image/ImageViewer';
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import images from '../config/images'
import { FeedNavigationPages, ListingDetailsSceenProps } from '../navigation/feed-navigation/types';

const ListingDetailsScreen = ({navigation ,route}:ListingDetailsSceenProps) => {
    
    const { images: remote_images, title, price, description } = route.params
    const [view, setView] = useState(false)
    const [url, setUrl] = useState<string>(null)
    const childFunc = React.useRef(null)

    
    function fullScreen(index:number){
        /*navigation.navigate(FeedNavigationPages.ListingImage, { 
                                                                image_url : remote_images[index].url,
                                                                handleLeftPress : ()=>navigation.goBack()
                                                            }
                            )*/
                            console.log('full screen ' + index )
        setUrl(remote_images[index].url)
        setView(true)
        childFunc.current.show(remote_images[index].url, 'arrow-left')
    }
    
    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 1}
		    >
            {/*<Image 
                style={styles.image} 
                uri={remote_images[0].url} 
                tint='light'
                preview={{uri : remote_images[0].thumbnailUrl}}
            />*/}

            <ImageSwiper 
                images={remote_images} 
                name={'url'}  
                viewImage={(index)=>fullScreen(index)}
            />
            <ImageViewer ref={childFunc}/>
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
