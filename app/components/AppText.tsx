import React from 'react'
import { Platform, StyleProp, StyleSheet, Text } from 'react-native';

import defaultStyles from '../config/default.styles'

type AppTextProps = {
    text: string,
    style?: StyleProp<any>
}

function  AppText({ text, style }: AppTextProps) {
    return (
        <Text style={[defaultStyles.text, style]} >{text}</Text>
    )
}

export default AppText

const styles = StyleSheet.create({
    
})

