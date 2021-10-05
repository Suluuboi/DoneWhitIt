import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, Platform, StyleSheet, Text, TextInput, TextInputFocusEventData, View } from 'react-native'
import colors from '../../config/colors';


import defaultStyles from '../../config/default.styles';
import { MaterialCommunityIconsSet } from '../icon/types';

/**Reusable input text Button */

type AppTextInputProps={
    icon_name   ?: MaterialCommunityIconsSet,
    placeholder ?: string,
    onChangeText?: (text: string)=>void
    autoCorrect?: boolean
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
    keyboardType?: KeyboardTypeOptions,
    textContentType?: any//only works on ios for auto fill
    secureTextEntry?: boolean //shop the text or not
    onBlur?: any//NativeSyntheticEvent<TextInputFocusEventData>
    autoFocus?: boolean,
    maxLength?: number,
    numberOfLines?: number,
    width?: number | string | undefined//the width of the text
}

export default function AppTextInput({icon_name,placeholder, onChangeText ,autoCorrect, keyboardType,autoCapitalize, textContentType, secureTextEntry, onBlur, autoFocus=false, maxLength, numberOfLines, width='100%'}:AppTextInputProps) {
    return (
        <View style={[styles.container,{width: width}]}> 
            {icon_name &&   <MaterialCommunityIcons 
                                                color={defaultStyles.colors.medium_grey}
                                                name={icon_name as any} 
                                                size={20}
                                                style={styles.icon}
                            />}
            <View style={styles.text_container}>
                <TextInput  
                    placeholderTextColor={defaultStyles.colors.medium_grey}
                    style={[defaultStyles.text]} 
                    placeholder={placeholder} 
                    autoCapitalize={autoCapitalize ? autoCapitalize: "none"}
                    autoCorrect={autoCorrect? autoCorrect: true}
                    keyboardType={keyboardType ? keyboardType : "email-address"}
                    onChangeText={(text)=>onChangeText ? onChangeText(text): undefined}
                    textContentType={textContentType ? textContentType : "emailAddress"}
                    secureTextEntry={secureTextEntry ? secureTextEntry: false}
                    onBlur={onBlur ? onBlur : undefined}
                    maxLength={maxLength? maxLength :undefined}
                    numberOfLines={numberOfLines ? numberOfLines :undefined}
                    autoFocus={autoFocus}
                    multiline
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 25,
        flexDirection:"row",
        padding: 15,
        marginVertical: 10
    },
    icon:{
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 3
    },
    text_container:{
        width: '100%'
    }
})