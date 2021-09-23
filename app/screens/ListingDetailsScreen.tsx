import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AppText from '../components/AppText'
import colors from '../config/colors'

type ListingDetailsScreenProps = {
    title:string,
    price: string,
    description: string,
    image: any
}

const ListingDetailsScreen = ({title, price, description, image}:ListingDetailsScreenProps) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} ></Image>
            <View style={styles.details_container}>
                <AppText style={styles.title} text={title}/>
                <AppText style={styles.price} text={price}/>
            </View>
            
        </View>
    )
}

export default ListingDetailsScreen

const styles = StyleSheet.create({
    container:{
        flex:1
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
    }

})
