import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Selection } from '../../screens/InputPlaygroud.Screen';
import Icon from '../Icon'

type CategoryPickerItemProps={
    category: Selection,
    onPress: ()=>void
}

export default function CategoryPickerItem({category, onPress}: CategoryPickerItemProps) {
    return (
        <View style={styles.container}>
            <Icon/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})
