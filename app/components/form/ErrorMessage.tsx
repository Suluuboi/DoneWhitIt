import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import AppText from '../AppText'

/**Display the message in the app taxt if there is an error or flied was touched. */

type ErrorMessageProps={
    error?: string | undefined
    visable?: boolean
}

export default function ErrorMessage({error, visable}: ErrorMessageProps) {

    if(!visable || !error) return null;

    return (
        <>{error && <AppText style={styles.error} text={error}/>}</>
    )
}

const styles = StyleSheet.create({
    error: {color: 'red'}
})
