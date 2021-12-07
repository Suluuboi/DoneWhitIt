import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import lottie from '../config/lottie-animations'

type LoadingActivityProps = {
    visable : boolean | undefined,
    style   ?: StyleProp<ViewStyle>
}

export default function LoadingActivity({visable, style}:LoadingActivityProps) {

    if(!visable) return null

    return (
        <AnimatedLottieView
            style={[styles.animation, style]}
            autoPlay
            loop
            source={lottie.loading_dots}
        />
    )
}

const styles = StyleSheet.create({
    animation:{
        height: 100
    }
})
