import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors'
import AppText from './AppText'

export default function OfflineNotice() {

    const net_info = useNetInfo();

    if(net_info.type !== "unknown" && net_info.isInternetReachable === false)
    
    return (
        <View style={styles.container}>
            <AppText 
                style={{color: colors.white}} 
                text={'No Internet Connection'} 
            />
        </View>
    )

    return null;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: 50,
        width: '100%',
        position: 'absolute',
        //top: Constants.,
        top: Constants.statusBarHeight,
        zIndex: 1
    }
})
