import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import colors from '../config/colors'
import AppText from './AppText'

type ListItemProps = {
    image: ImageSourcePropType,
    title: string,
    sub_title: string
}

function ListItem({image, title, sub_title}:ListItemProps){
    return (
        <View style={styles.container} >
            <Image style={styles.image} source={image} />
            <View style={styles.text_container}>
                <AppText style={styles.title} text={title} />
                <AppText style={styles.sub_title} text={sub_title}/>
            </View>
            
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        //borderWidth: 1,
        borderColor: colors.secondary,
        justifyContent: "flex-start",
        //borderRadius: 10
        marginVertical: 20
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        //marginLeft: 10
    },
    text_container:{
        marginLeft: 10,
        marginTop: 10
    },
    title:{
        fontSize:16,
        fontWeight: "500"
    },
    sub_title:{
        fontSize:14,
        color: colors.medium_grey
    }
})
