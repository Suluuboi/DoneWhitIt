import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Snackbar } from 'react-native-paper'

/**Acustom snackbar 
 * NB!!! not complete yet
 */

type CustomSnackBarProps = {
    unDo?       : ()=>void
    undo_label  : string 
    message     : string; 
}

export default function CustomSnackBar({unDo, undo_label, message}:CustomSnackBarProps) {
    return (
        <View>
            <Snackbar
                visible={true}
                onDismiss={() => console.log('dismissed')}
                action={{
                    label: undo_label,
                    onPress: () => {},
                }}
            style={{backgroundColor: "blue"}}
            >
                <View><Text>{message}</Text></View>
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({})
