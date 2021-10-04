import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Button, FlatList, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { number } from 'yup'
import defaultStyles from '../../config/default.styles'
import { Selection } from '../../screens/InputPlaygroud.Screen'
import AppText from '../AppText'
import CustomSafeAreaView from '../CustomSafeAreaView'
import PickerItem from '../PickerItem'

/**This creates a slection model */

type AppPickerProps={
    placeholder: string,
    items: Selection[],
    //selected_item: Selection,
    onSelectItem:(item:Selection)=>any //what happens when you select an item
    width?: number | undefined | string
    PickerItemComponent?: JSX.Element | undefined //change the picker List component if specified
}

export default function AppPicker({ placeholder, items, onSelectItem, width='100%', PickerItemComponent=undefined}: AppPickerProps) {

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
                    {<MaterialCommunityIcons 
                        color={defaultStyles.colors.medium_grey}
                        name={'chevron-down'} 
                        size={20}
                                                        style={styles.icon}
                    />}
                    {/*placeholder && <AppText style={styles.text} text={label ? label : placeholder}/>*/}
                    {label ? <AppText style={styles.text} text={label}/> :  <AppText style={styles.placeholder} text={placeholder}/>}

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
                            PickerItemComponent? PickerItemComponent : <PickerItem onPress={()=>selectCategory(item)} category={item}/>
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
    },
    placeholder:{
        color: defaultStyles.colors.medium_grey,
        flex: 1
    }
})
