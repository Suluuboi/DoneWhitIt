import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

/**SHow a progress bar when visable is true */

type UploadScreenProps={
    progress: number;
    visable: boolean;
}

export default function UploadScreen({progress=0, visable=false}: UploadScreenProps) {
    return (
        <Modal visible={visable}>
            <View style={styles.container}>
                <Text>{progress*100}%</Text>
            </View>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'

    }
})
