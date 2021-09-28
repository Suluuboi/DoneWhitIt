import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../config/colors'

type IconProps = {
    name?               : any
    size?               : number
    background_color?   : string
    icon_color?         : string
}

export default function Icon({size=40, name='email', background_color=colors.black, icon_color=colors.white}:IconProps) {
    return (
        <View style={[styles.container,{width: size,height:size, borderRadius: size/2, backgroundColor: background_color}]}>
            <MaterialCommunityIcons name={name} color={icon_color} size={size * .5}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
})
