import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../config/colors';

/** Cutom button for new listing Icon */

type NewListingButtonProps = {
    size?: number,
    color?: string,
    onPress: ()=>void
}

export default function NewListingButton({size=40, color=colors.medium_grey, onPress}:NewListingButtonProps) {

    const increase = 20//the number to increase the size by

    return (
        
        <View style={[  
                        styles.container,
                        {
                            width: size + increase, 
                            height: size + increase,
                            borderRadius: size + increase / 2,
                            backgroundColor: color
                        }
                    ]}
        >
            <TouchableOpacity onPress={()=>onPress()}>
                <MaterialCommunityIcons
                    name={'plus-circle'}
                    color={colors.white}
                    size={size}
                />
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems : 'center',
        borderColor: colors.white,
        borderWidth: 5,
        bottom: 15,
        justifyContent: 'center'
    }
})
