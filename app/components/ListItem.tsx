import React from 'react'
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import colors from '../config/colors'
import AppText from './AppText'
import Icon from '../components/Icon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/default.styles'

type ListItemProps = {
    image ?             : ImageSourcePropType,
    title?              : string,
    sub_title?          : string,
    onPress?            : ()=>void,
    renderRightAction?  : any,
    IconComponent?      : JSX.Element,
    style?              : StyleProp<any>,
    chevron?             : boolean 
}

function ListItem({image, IconComponent,title, sub_title, onPress, renderRightAction, style, chevron}:ListItemProps){
    return (
        <Swipeable 
            renderRightActions={renderRightAction}    
        >
        <TouchableHighlight
            underlayColor={colors.light_grey}
            onPress={onPress}
        >
            <View style={[styles.container, style]} >
                {
                    IconComponent &&    <View style={styles.icon_container}>
                                            {IconComponent}
                                        </View>
                }
                
                {/**if an image is supplied */}
                {image &&   <Image 
                                style={styles.image} 
                                source={image} 
                            />
                }

                <View style={styles.text_container}>
                    {title && <AppText style={styles.title} text={title} numberOfLines={1} />}
                    {sub_title && <AppText style={styles.sub_title} text={sub_title} numberOfLines={2}/>}
                </View>

                {   chevron &&
                    <View style={styles.chevron}>
                        <MaterialCommunityIcons color={colors.medium_grey} size={20} name={'chevron-right'}>
                        
                        </MaterialCommunityIcons>
                    </View>
                }
                
            </View>
        </TouchableHighlight>
        </Swipeable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        //borderWidth: 1,
        borderColor: colors.secondary,
        justifyContent: "flex-start"
    },
    icon_container:{
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        //marginLeft: 10
    },
    text_container:{
        flex: 1,
        //marginLeft: 10,
        justifyContent: 'center',
        marginHorizontal: 10
        
    },
    title:{
        fontSize:16,
        fontWeight: "500"
    },
    sub_title:{
        fontSize:14,
        color: colors.medium_grey
    },
    chevron:{
        alignSelf: 'center',
        fontSize: 100,
        right: 10
    }
})
