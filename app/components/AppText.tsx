import React from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import defaultStyles from '../config/default.styles'

type AppTextProps = {
    text: string
    style?: TextStyle//StyleProp<Text>
    numberOfLines?: number | undefined
}

function  AppText({ text, style, numberOfLines=undefined }: AppTextProps) {
    return (
        <Text numberOfLines={numberOfLines} style={[defaultStyles.text, style]} >{text}</Text>
    )
}

export default AppText

const styles = StyleSheet.create({
    
})

