import { FormikContextType, FormikErrors, FormikTouched } from 'formik'
import React, { useCallback } from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native'
import { useFormikContext } from 'formik';
import debounce from 'lodash.debounce';

import AppTextInput from '../AppTextInput'
import ErrorMessage from '../ErrorMessage'
import AppText from '../../AppText'
import { string } from 'yup/lib/locale'
import { MaterialCommunityIconsSet } from '../../icon/types';

/**
 * NB!!! this component needs to be inserted into a formik component
 * A text field that does error handeling with formik */

type AppFormFieldProps={
    context_field_name:  string; //the name of the fieled to be validated
    //context: FormikContextType<any>//the info that will be sent from formik
    placeholder?: string;
    //possible options for App text that dont include any formic data
    icon_name   ?: MaterialCommunityIconsSet,
    post_icon_name ?: MaterialCommunityIconsSet,
    onChangeText ?: (text: string)=>void
    autoCorrect?: boolean
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
    keyboardType?: KeyboardTypeOptions,
    textContentType?: any//only works on ios for auto fill
    secureTextEntry?: boolean //shop the text or not
    //onBlur?: any//NativeSyntheticEvent<TextInputFocusEventData> 
    autoFocus?: boolean
    maxLength?: number
    numberOfLines?: number
    width?:number | string | undefined
    height?:number | string | undefined
    multiline?: boolean | undefined
    autoSubmit ?: number//how long befor auto submit
}

export default function AppFormFieldFormik({context_field_name, post_icon_name, autoSubmit,
                                            placeholder, autoCapitalize, onChangeText,
                                            autoCorrect, keyboardType, textContentType, 
                                            secureTextEntry, icon_name, autoFocus, 
                                            maxLength, numberOfLines, width='100%', 
                                            //height='100%',
                                            multiline=undefined}:AppFormFieldProps) { 


    const { setFieldTouched,
            setFieldValue ,
            handleSubmit,
            errors, touched, values} = useFormikContext<any>()//context

    function clearTextBox(field_name: string ){
        setFieldValue(field_name, '')
        autoSubmit && handleSubmit()
    }

    const debounceText= useCallback(debounce((nextValue) => handleSubmit() , autoSubmit), [])

    return (
        <>
            <AppTextInput 
                onChangeText={(text)=>{
                    setFieldValue(context_field_name, text) 
                    autoSubmit && debounceText(text)
                    onChangeText && onChangeText}}    
                onBlur={()=>setFieldTouched(context_field_name)}
                value={values[context_field_name]}
                //other props that are the same in AppTextInput
                placeholder={placeholder} 
                autoCapitalize={autoCapitalize ? autoCapitalize: "none"}
                autoCorrect={autoCorrect? autoCorrect: true}
                keyboardType={keyboardType ? keyboardType : "default"}
                textContentType={textContentType ? textContentType : "emailAddress"}
                secureTextEntry={secureTextEntry}
                icon_name={icon_name}
                autoFocus={autoFocus ? autoFocus : false}
                maxLength={maxLength ? maxLength : undefined}
                numberOfLines={numberOfLines ? numberOfLines : undefined}
                width={width}
                //height={height}
                multiline={multiline}
                post_icon_name={post_icon_name}
                clearText={()=>clearTextBox(context_field_name)}
            />

            {/** Error Message*/}
            <ErrorMessage error={errors[context_field_name] as string} visable={touched[context_field_name] as boolean}/>
        </>
    )
}

const styles = StyleSheet.create({
    
})

