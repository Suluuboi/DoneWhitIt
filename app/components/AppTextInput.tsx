import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'


import defaultStyles from '../config/default.styles';

type AppTextInputProps={
    icon_name   ?: any,
    placeholder ?: string
}

export default function AppTextInput({icon_name,placeholder}:AppTextInputProps) {
    return (
        <View style={styles.container}> 
            {icon_name &&   <MaterialCommunityIcons 
                                                color={defaultStyles.colors.medium_grey}
                                                name={icon_name} 
                                                size={20}
                                                style={styles.icon}
                            />}
            <TextInput  
                style={defaultStyles.text} 
                placeholder={placeholder} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 25,
        flexDirection:"row",
        width: "100%",
        padding: 15,
        marginVertical: 10
    },
    icon:{
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})
