import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { KeyboardTypeOptions, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../config/colors';


import defaultStyles from '../config/default.styles';
import AppButton from './AppButton';

/**Reusable input text Button */

type AppTextInputProps={
    icon_name   ?: any,
    placeholder : string,
    onChange: (text: string)=>void
    autoCorrect?: boolean
    autoCapitalize?: any
    keyboardType?: KeyboardTypeOptions,
    textContentType?: any//only works on ios for auto fill
    secureTextEntry?: boolean //shop the text or not
}

export default function AppTextInput({icon_name,placeholder, onChange ,autoCorrect, keyboardType,autoCapitalize, textContentType, secureTextEntry}:AppTextInputProps) {
    return (
        <View style={styles.container}> 
            {icon_name &&   <MaterialCommunityIcons 
                                                color={defaultStyles.colors.medium_grey}
                                                name={icon_name} 
                                                size={20}
                                                style={styles.icon}
                            />}
            <TextInput  
                style={[defaultStyles.text, styles.text_input]} 
                placeholder={placeholder} 
                autoCapitalize={autoCapitalize ? autoCapitalize: "none"}
                autoCorrect={autoCorrect? autoCorrect: true}
                keyboardType={keyboardType ? keyboardType : "email-address"}
                onChangeText={(text)=>onChange(text)}
                textContentType={textContentType ? textContentType : "emailAddress"}
                secureTextEntry={secureTextEntry ? secureTextEntry: false}
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
        alignItems: "center",
        paddingTop: 3
    },
    text_input:{
        width: "100%"
    }
})
