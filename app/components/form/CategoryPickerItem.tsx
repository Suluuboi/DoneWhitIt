import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import AppText from '../AppText';
import Icon from '../Icon'
import { MaterialCommunityIconsSet } from '../icon/types';

type ItemProperties = {
    label: string,
    background_color: string,
    icon: MaterialCommunityIconsSet
}

type CategoryPickerItemProps={
    //label: string,
    onPress: ()=>void
    item: ItemProperties
}

export default function CategoryPickerItem({item, onPress}: CategoryPickerItemProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            
                <Icon background_color={item.background_color} name={item.icon} />
                <AppText style={styles.text} text={item.label} />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: 'center',
        width: '33%'
    },
    icon:{
        
    },
    text:{
       marginTop: 10,
       textAlign: "center"
        
    }
})
