/** THis component display athe filter applied to and can also clear that filter */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../config/colors';
import IconButton from '../IconButton';


type FilterBadgeProps = {
    text: string
    clear: ()=>void
}

export default function FilterBadge({text, clear}: FilterBadgeProps) {
    return (
        <View
            style={styles.container}
        >
            
                
                <View style={styles.text_container}>
                    <IconButton 
                        iconStyle={{color: colors.medium_grey}}
                        onPress={clear} 
                        icon={'close-circle'}  
                        
                    />
                    <View style={styles.wrap}>
                        <Text>{text}</Text>
                    </View>
                    
                </View>
                
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    },
    text_container:{
        paddingVertical:2 ,
        paddingHorizontal: 5,
        flexDirection: 'row', 
        backgroundColor: colors.light_grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    wrap:{
        flexWrap: 'wrap'
    }
})
