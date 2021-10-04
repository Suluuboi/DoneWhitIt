import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Selection } from '../screens/InputPlaygroud.Screen'
import AppText from './AppText'

type PickerItemProps={
    category: Selection,
    onPress: ()=>void
}

export default function PickerItem({category, onPress}:PickerItemProps) {
    return (
        <TouchableOpacity style={styles.text} onPress={onPress}>
            <AppText text={category.label}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text:{
        padding: 20
    }
})
