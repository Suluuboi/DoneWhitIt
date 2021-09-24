import React from 'react'
import { Platform, StyleProp, StyleSheet, Text } from 'react-native'

type AppTextProps = {
    text: string,
    style?: StyleProp<any>
}

function  AppText({ text, style }: AppTextProps) {
    return (
        <Text style={[styles.text, style]} >{text}</Text>
    )
}

export default AppText

const styles = StyleSheet.create({
    text:{
        fontSize: 18,
        fontFamily : Platform.OS === "android" ? "Roboto" : "Avenir"
    }
})

