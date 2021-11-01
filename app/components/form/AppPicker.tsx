import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { ElementType, useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { number } from 'yup'
import colors from '../../config/colors'
import defaultStyles from '../../config/default.styles'
import { Selection } from '../../screens/InputPlaygroud.Screen'
import AppText from '../AppText'
import CustomSafeAreaView from '../CustomSafeAreaView'
import Icon from '../Icon'
import PickerItem from '../PickerItem'

/**This creates a slection model */

type AppPickerProps={
    placeholder: string,
    items: Selection[],
    selectedItem: Selection,
    onSelectItem:(item:Selection)=>any //what happens when you select an item
    width?: number | undefined | string
    PickerItemComponent?: ElementType<any> | undefined //change the picker List component if specified
}

export default function AppPicker({ placeholder, items, onSelectItem, width='100%', selectedItem, PickerItemComponent=undefined}: AppPickerProps) {

    const [label, setLabel] = useState('')

    const [modalVisable, setModalVisable] = useState(false);

    function selectCategory(category:Selection ){
        setModalVisable(false)
        onSelectItem(category)
        setLabel(category.label)
    }

    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={()=>setModalVisable(true)}>

                <View style={[styles.container, {width: width}]}> 

                    <Icon
                        name="apps"
                        icon_color={colors.white}
                        background_color={colors.primary}
                    />
                    <TextInput
                        style={styles.textInput}
                        defaultValue={selectedItem ? selectedItem.label.toString() : placeholder}
                        editable={false}
                    />
                    <Icon
                        name="chevron-down"
                        icon_color={colors.white}
                        background_color={colors.primary}
                    />

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
                        numColumns={PickerItemComponent ? 3 : 1 }
                        renderItem={({item})=>
                            PickerItemComponent? <PickerItemComponent onPress={()=>selectCategory(item)} item={item} /> : <PickerItem onPress={()=>selectCategory(item)} item={item}/>
                        }
                    />
                        
                </CustomSafeAreaView>
                
            </Modal>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container:{
        /*backgroundColor: defaultStyles.colors.light_grey,
        borderRadius: 25,
        flexDirection:"row",
        width: "100%",
        padding: 15,
        marginVertical: 10*/
        backgroundColor: colors.white,
        borderRadius: 25,
        flexDirection: "row",
        //padding: 15,
        marginVertical: 10,
        shadowColor: colors.light_grey,
        shadowOffset: {
        width: 1,
        height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    icon:{
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        fontSize: 18,
        marginLeft: 10,
        flex: 1,
    },
    placeholder:{
        color: defaultStyles.colors.medium_grey,
        flex: 1
    }
})
