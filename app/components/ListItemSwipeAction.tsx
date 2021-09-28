import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';



import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../config/colors'

/**this componante will be displayed when you swipe a List item*/
export interface ListItemIcon{
    color?  : string;
    name    : any; //the name of the material community Icon
    size?   :number;
}

type ListItemSwipeActionProps = {
    backgroundColor?    : string
    width?              : number
    text?               : string
    icon?               : ListItemIcon
    onPress             :()=>any
    unDo?               :()=>any
}


export default function ListItemSwipeAction({backgroundColor,width, text,icon, onPress}: ListItemSwipeActionProps) {

    

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[
                    styles.container,
                    {
                        backgroundColor: backgroundColor ? backgroundColor: colors.danger,
                        width: width ? width: 70
                    }
                ]}
            >
                
                {icon ? <MaterialCommunityIcons color={colors.white} name={icon ? icon.name : "delete"} size={30}/> : <></>}
                {text ? <Text style={styles.text}>{text?text:"Delete"}</Text> : <></>}
                
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    text:{
        color: colors.white
    }
})
