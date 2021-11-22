import { useFormikContext } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppFormFieldFormik } from '../formik'

export default function AppAutoFormFieldSubmit() {

    const { submitForm } = useFormikContext()

    return (
        <AppFormFieldFormik
            context_field_name = 'a'
            //onChangeText={(value)=>{de}}
        />
    )
}

const styles = StyleSheet.create({})
