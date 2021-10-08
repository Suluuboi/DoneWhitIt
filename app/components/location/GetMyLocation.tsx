import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import useLocation from '../../hooks/useLocation';

/** Get the current device Location */

export default function GetMyLocation() {

    const location = useLocation()

    return (
        <View>
            {location && <Text>{JSON.stringify(location, null, '\t')}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({})
