import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../config/colors'

/**A line that separates any components making it easier to see the components */

export default function ListItemSeparater() {
    return (
        <View style={styles.container}>
            <View style={styles.separator} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignItems: "center"
    },
    separator:{
        width: "90%",
        height: 1,
        backgroundColor: colors.light_grey,
    }
})
