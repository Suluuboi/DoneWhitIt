import React, { ReactNode } from 'react'
import { SafeAreaView, StyleProp, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

/**This component encapuslates the infomation in it 
 * and makes sure it displays in the safe area veiw */

type ScreenProps = {
    children: React.ReactNode
    style?: StyleProp<any>
}

export default function CustomSafeAreaView({children, style}: ScreenProps) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: Constants.statusBarHeight,//add padding to top that is equila to the status bar
        flex: 1
    }
})
