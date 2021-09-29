import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import defaultStyles from '../config/default.styles'
import { Selection } from '../screens/InputPlaygroud.Screen'
import AppText from './AppText'
import CustomSafeAreaView from './CustomSafeAreaView'
import PickerItem from './PickerItem'

/**This creates a slection model */

type AppPickerProps={
    placeholder: string,
    items: Selection[],
    selected_item: Selection,
    onSelectItem:(item:any)=>void //what happens when you select an item
}

export default function AppPicker({ placeholder, items, selected_item, onSelectItem}: AppPickerProps) {

    const [modalVisable, setModalVisable] = useState(false);

    function selectCategory(category:Selection ){
        setModalVisable(false)
        onSelectItem(category)
    }

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
                    {placeholder && <AppText style={styles.text} text={selected_item ? selected_item.lable : placeholder}/>}

                </View>

            </TouchableWithoutFeedback>

            <Modal 
                visible={modalVisable}
                animationType={'slide'}
            >
                <CustomSafeAreaView>
                    <Button onPress={()=>setModalVisable(false)} title={'Close'}/>
                    <FlatList
                        data={items}
                        keyExtractor={item=>item.value.toString()}
                        renderItem={({item})=>
                            <PickerItem onPress={()=>selectCategory(item)} category={item}/>
                        }
                    />
                        
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
