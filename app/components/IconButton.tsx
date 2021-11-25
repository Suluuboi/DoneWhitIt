import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    TextStyle
} from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIconsSet } from './icon/types';

type IconButtonProps = {
    containerStyle ?: StyleProp<ViewStyle>, 
    iconSize?: number
    icon: MaterialCommunityIconsSet, 
    iconStyle ?: StyleProp<TextStyle>, 
    onPress : ()=>void
}

function IconButton({ containerStyle, icon, iconStyle, onPress, iconSize=30 }: IconButtonProps) {

    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
        >
            <MaterialCommunityIcons
                size={iconSize}
                style={iconStyle}
                name={icon as any}
            />
        </TouchableOpacity>
    )
}

export default IconButton;