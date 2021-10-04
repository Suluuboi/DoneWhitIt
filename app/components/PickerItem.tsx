import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Selection } from '../screens/InputPlaygroud.Screen'
import AppText from './AppText'

type PickerItemProps={
    item: Selection,
    onPress: ()=>void
}

export default function PickerItem({item, onPress}:PickerItemProps) {
    return (
        <TouchableOpacity style={styles.text} onPress={onPress}>
            <AppText text={item.label}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text:{
        padding: 20
    }
})
