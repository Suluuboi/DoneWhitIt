import React, { useEffect, useState } from "react"
import { Animated, ColorValue, StyleSheet, Text, View } from "react-native"
import colors from "../config/colors"
import CustomSafeAreaView from "./CustomSafeAreaView"


/**Header: colapses and dissapears when scrolling up, Header stays constant */
/** Subheader animate up and down based on (subHeaderHeightPercentage) and sticks to top*/

type AnimatedHeader2Props = {
    subHeaderHeightPercentage: number,//0-100, this is in persentage
    headerHightPixel: number,//this is pixels
    headerBackgroundColor   ?: ColorValue,
    subHeaderBackgroundColor   ?: ColorValue,
    bodyBackgroundColor     ?: ColorValue,
    animatedValue           ?: Animated.Value
    headerComponent         ?: JSX.Element
    children?               : React.ReactNode
}

export default function AnimatedCollapsingHeader({  
                        subHeaderHeightPercentage,
                        headerHightPixel, 
                        children, 
                        headerBackgroundColor=colors.white, 
                        subHeaderBackgroundColor=colors.white, 
                        bodyBackgroundColor=colors.light_grey,
                        headerComponent=null,
                        animatedValue
                    }: AnimatedHeader2Props){

    const diffClamp = Animated.diffClamp(animatedValue, 0, headerHightPixel)

    const translateY = diffClamp.interpolate({
        inputRange:[0, headerHightPixel],
        outputRange: [0, -headerHightPixel],
        extrapolate: 'clamp'
    })

    const opacity = diffClamp.interpolate({
        inputRange:[0, headerHightPixel],
        outputRange: [1,0],
        extrapolate: 'clamp'
    })

    const [value] = useState(new Animated.Value(subHeaderHeightPercentage))

    useEffect(()=>{
        Animated.timing(value, {
            toValue: subHeaderHeightPercentage,
            duration: 500,
            useNativeDriver: false
        }).start()
    }, [subHeaderHeightPercentage])

    const height = value.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    return (
        /*<CustomSafeAreaView>*/
            <View style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                backgroundColor: bodyBackgroundColor,
            }}>

                {/**Sub Header component */}
                {<Animated.View style={[
                    styles.container,
                    {
                        //width: '100%',
                        height: height,
                        transform:[
                            {translateY: translateY}
                        ],
                        backgroundColor: subHeaderBackgroundColor,
                    }
                ]}></Animated.View>}

                {/**Colapsing header */}
                <Animated.View style={[
                    styles.container,
                    {
                        height: headerHightPixel,
                        backgroundColor: headerBackgroundColor,
                        transform:[
                            {translateY: translateY}
                        ],
                        //zIndex: 1000,
                        opacity: opacity
                    }
                ]}>
                    <View style={{width: '100%', height:'100%'}}>
                        {headerComponent}
                    </View>
                </Animated.View>
                

                {/**content*/}
                <View>
                    {children}
                </View>
            </View>
        /*</CustomSafeAreaView>*/
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        width: '100%',
        zIndex: 1000
    }
})
