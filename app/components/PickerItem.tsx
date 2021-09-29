import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Category } from '../screens/InputPlaygroud.Screen'
import AppText from './AppText'

type PickerItemProps={
    category: Category,
    onPress: ()=>void
}

export default function PickerItem({category, onPress}:PickerItemProps) {
    return (
        <TouchableOpacity style={styles.text} onPress={onPress}>
            <AppText text={category.lable}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text:{
        padding: 20
    }
})
