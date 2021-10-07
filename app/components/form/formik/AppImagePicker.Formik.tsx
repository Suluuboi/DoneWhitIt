import { useFormikContext } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ImagePicker from '../../image/ImagePicker'
import ErrorMessage from '../ErrorMessage'

type AppImagePickerFormikProps = {
    name: string
}

export default function AppImagePickerFormik({name}: AppImagePickerFormikProps) {

    const { errors,touched ,setFieldValue} = useFormikContext<any>()

    function update(uris: ImageURI[]){
        setFieldValue(name,uris);
    }

    return (
        <>
            <ImagePicker 
                getImageURIs={update}
            />
            <ErrorMessage error={errors[name] as string} visable={touched[name] as boolean} />
        </ >
    )
}

const styles = StyleSheet.create({})
