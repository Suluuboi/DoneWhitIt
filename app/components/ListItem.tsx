import React from 'react'
import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import colors from '../config/colors'
import AppText from './AppText'
import Icon from '../components/Icon'

type ListItemProps = {
    image ?             : ImageSourcePropType,
    title?              : string,
    sub_title?          : string,
    onPress?            : ()=>void,
    renderRightAction?  : any,
    IconComponent?      : JSX.Element,
    style?              : StyleProp<any>
}

function ListItem({image, IconComponent,title, sub_title, onPress, renderRightAction, style}:ListItemProps){
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
                    {title && <AppText style={styles.title} text={title} />}
                    {sub_title && <AppText style={styles.sub_title} text={sub_title}/>}
                </View>
                
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
        marginLeft: 10,
        justifyContent: 'center'
    },
    title:{
        fontSize:16,
        fontWeight: "500"
    },
    sub_title:{
        fontSize:14,
        color: colors.medium_grey
    }
})
