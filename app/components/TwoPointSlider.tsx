import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import colors from '../config/colors';
import { SIZES } from '../config/phone';

type TowPointerSliderProps = {
    values?: number[], 
    min? : number, 
    max?: number, 
    prefix?: string , 
    postfix?: string, 
    onValuesChange : (value)=>void
}

export default function TwoPointSlider({ values, min, max, prefix, postfix, onValuesChange }: TowPointerSliderProps) {

    return (
        <MultiSlider
            values={values}
            sliderLength={SIZES.width - (10 * 2) - 20}
            min={min}
            max={max}
            step={1}
            markerOffsetY={20}
            selectedStyle={{
                backgroundColor: colors.primary
            }}
            trackStyle={{
                height: 10,
                borderRadius: 10,
                backgroundColor: colors.light_grey
            }}
            minMarkerOverlapDistance={50}
            customMarker={(e) => {
                return (
                    <View
                        style={{
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                borderWidth: 4,
                                borderColor: colors.white,
                                backgroundColor: colors.primary,
                                ...styles.shadow
                            }}
                        />
                        <Text style={{ marginTop: 5, color: colors.darkGray }}>{prefix}{e.currentValue} {postfix}</Text>
                    </View>
                )
            }}
            onValuesChange={(values) => onValuesChange(values)}
        />
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.1
    }
})