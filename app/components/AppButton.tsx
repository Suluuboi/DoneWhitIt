import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../config/colors';

type AppButtonProps = {
    text: string,
    button_color?: string,
    disabled?: boolean | null | undefined
    onPress : () => void
}

function AppButton({text ,onPress, button_color}:AppButtonProps) {
    return (
        <TouchableOpacity 
            disabled={undefined}
            style={[styles.button_container, {backgroundColor: button_color ? button_color : colors.primary,}]} 
            onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
                
    )
}

export default AppButton;

const styles = StyleSheet.create({
    text:{
        color: colors.white,
        fontSize: 18,
        fontWeight:"bold"
    },
    button_container:{
        width: "100%",
        borderRadius: 25,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    }
})


