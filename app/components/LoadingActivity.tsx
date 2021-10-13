import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import lottie from '../config/lottie-animations'

type LoadingActivityProps = {
    visable: boolean | undefined
}

export default function LoadingActivity({visable}:LoadingActivityProps) {

    if(!visable) return null

    return (
        <AnimatedLottieView
            autoPlay
            loop
            source={lottie.loading_dots}
        />
    )
}

const styles = StyleSheet.create({})
