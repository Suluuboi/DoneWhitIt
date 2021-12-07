import React, { useEffect, useRef, useState } from "react"
import { Animated, ColorValue, Dimensions, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Constants from 'expo-constants';

import colors from "../config/colors"
import CustomSafeAreaView from "./CustomSafeAreaView";

type AnimatedHeader2Props = {
    headerHeightPersentage: number,//0-100
    headerBackgroundColor   ?: ColorValue,
    bodyBackgroundColor     ?: ColorValue,
    animatedValue            : Animated.Value
    children?: React.ReactNode
}

const AnimatedHeader2 = ({
                            headerHeightPersentage, 
                            children, headerBackgroundColor=colors.white, 
                            bodyBackgroundColor=colors.light_grey,
                            animatedValue
                        }: AnimatedHeader2Props)=>{

    const [value] = useState(new Animated.Value(headerHeightPersentage))
    const {height} = useWindowDimensions()
    const [headerHeightPixels, setHeaderHeightPixels] = useState(height*(headerHeightPersentage/100))
    const [diffClamp, setDiffClamp] = useState(Animated.diffClamp(animatedValue, 0, headerHeightPixels))

    useEffect(()=>{
        Animated.timing(value, {
            toValue: headerHeightPersentage,
            duration: 500,
            useNativeDriver: false
        }).start()

        setHeaderHeightPixels(height*(headerHeightPersentage/100))
        setDiffClamp(Animated.diffClamp(animatedValue,0, height*(headerHeightPersentage/100)))

    }, [headerHeightPersentage])

    const headerHeight = value.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%']
    })

    //const diffClamp = Animated.diffClamp(animatedValue, 0, headerHeightPixels)

    const translateY = diffClamp.interpolate({
        inputRange:[0, headerHeightPixels],
        outputRange: [0, -headerHeightPixels],
        extrapolate: 'clamp'
    })

    return (
        <CustomSafeAreaView>
            <View style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                backgroundColor: bodyBackgroundColor,
            }}>
                {/**Header component */}
                <Animated.View style={
                    [
                        styles.container,{
                            width: '100%',
                            height: headerHeight,
                            backgroundColor: headerBackgroundColor,
                            transform:[
                                {translateY: translateY}
                            ],
                            //opacity: opacity
                        }
                    ]
                }><Text>{height*(headerHeightPersentage/100)}</Text></Animated.View>

                {/**content*/}
                <View>
                    {children}
                </View>
                
            </View>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        //top: Constants.statusBarHeight,
        left: 0,
        right: 0,
        zIndex: 100
    }
})

export default AnimatedHeader2