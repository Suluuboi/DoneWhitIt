import { FormikContextType, FormikErrors, FormikTouched } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFormikContext } from 'formik'

import AppTextInput from './AppTextInput'
import ErrorMessage from './ErrorMessage'

type AppFormFieldProps={
    name:               string;
    placeholder: string;
    //handleChange:   (name: string)=>any;
    //setFieldTouched:    (name: string)=>void,
    //errors: FormikErrors<any>
    //touched: FormikTouched<any>
    context: FormikContextType<unknown>
}

export default function AppFormField({name, context, placeholder}:AppFormFieldProps) { 

    const {setFieldTouched, handleChange, errors, touched} = context

    return (
        <>
            <AppTextInput 
                //icon_name="email" 
                placeholder={placeholder}
                //autoCorrect={false}
                onChangeText={handleChange(name)}    
                onBlur={()=>setFieldTouched(name)}
            />

            {/** Error Message*/}
            {/*<ErrorMessage error={errors[name] && undefined} visable ={ touched[name] && undefined}/> */}       
        </>
    )
}

const styles = StyleSheet.create({})
