import { useFormikContext } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ImagePicker from '../../image/ImagePicker'
import ErrorMessage from '../ErrorMessage';

/**A formic component that adds and and removes images */

type AppImagePickerFormikProps = {
    name: string,
    maxImages?: number | undefined
}

export default function AppImagePickerFormik({name, maxImages}: AppImagePickerFormikProps) {

    const { errors, setFieldValue, touched, values } = useFormikContext<any>();
    const imageUris = values[name]

    function handleAdd(uri: string){
        setFieldValue(name, [...imageUris, uri]);
    };

    function handleRemove(uri: string){
        setFieldValue(
            name,
            imageUris.filter((imageUri: string) => imageUri !== uri)
        );
    };

    return (
        <>
            <ImagePicker 
                images={values[name]}
                onAddImage={handleAdd}
                onRemovedImage={handleRemove}
                max={maxImages}
            />
            <ErrorMessage error={errors[name] as string} visable={touched[name] as boolean} />
        </ >
    )
}

const styles = StyleSheet.create({})
