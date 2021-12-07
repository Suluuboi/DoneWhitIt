import AnimatedLottieView from 'lottie-react-native'
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

type LottieAnimationProps = {
    lottie: any
    visable : boolean | undefined,
    style   ?: StyleProp<ViewStyle>
    autoPlay ?: boolean,
    loop ?: boolean
}

export default function LottieAnimation({lottie,visable, style, autoPlay=true, loop=true}:LottieAnimationProps) {

    if(!visable) return null

    return (
        <AnimatedLottieView
            style={[styles.animation, style]}
            autoPlay={autoPlay}
            loop={loop}
            source={lottie}
        />
    )
}

const styles = StyleSheet.create({
    animation:{
        height: 100
    }
})