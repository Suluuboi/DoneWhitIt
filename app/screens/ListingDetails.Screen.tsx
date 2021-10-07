import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'

import AppText from '../components/AppText'
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import images from '../config/images'

type ListingDetailsScreenProps = {
    title:string,
    price: string,
    description: string,
    image: ImageSourcePropType
}

const ListingDetailsScreen = ({title, price, description, image}:ListingDetailsScreenProps) => {


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} ></Image>
            <View style={styles.details_container}>
                <AppText style={styles.title} text={title}/>
                <AppText style={styles.price} text={price}/>

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
    user_container:{
        marginVertical: 30
    }

})
