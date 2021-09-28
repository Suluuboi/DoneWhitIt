import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Button, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import defaultStyles from '../config/default.styles'
import AppText from './AppText'
import CustomSafeAreaView from './CustomSafeAreaView'

type AppPickerProps={
    placeholder ?: string
}

export default function AppPicker({ placeholder}: AppPickerProps) {

    const [modalVisable, setModalVisable] = useState(false)

    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={()=>setModalVisable(true)}>

                <View style={styles.container}> 
                    {<MaterialCommunityIcons 
                        color={defaultStyles.colors.medium_grey}
                        name={'chevron-down'} 
                        size={20}
                                                        style={styles.icon}
                    />}
                    {placeholder && <AppText style={styles.text} text={placeholder}/>}

                </View>

            </TouchableWithoutFeedback>

            <Modal 
                visible={modalVisable}
                animationType={'slide'}
            >
                <CustomSafeAreaView>
                    <Button onPress={()=>setModalVisable(false)} title={'Close'}/>
                </CustomSafeAreaView>
                
            </Modal>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 25,
        flexDirection:"row",
        width: "100%",
        padding: 15,
        marginVertical: 10
    },
    icon:{
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        flex: 1
    }
})
