import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import colors from '../config/colors';

const TextButton = ({
    buttonContainerStyle,
    disabled=false,
    label,
    labelStyle,
    label2 = "",
    label2Style = {},
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                ...buttonContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: colors.white, ...labelStyle }}>
                {label}
            </Text>

            {label2 != "" &&
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'right',
                        color: colors.white,
                        ...label2Style
                    }}
                >
                    {label2}
                </Text>
            }
        </TouchableOpacity>
    )
}

export default TextButton;