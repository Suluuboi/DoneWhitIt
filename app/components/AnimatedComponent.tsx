import React, { useEffect, useState } from "react"
import { Animated, Text, View } from "react-native"


const ProgressBar = (props)=>{

    const [value] = useState(new Animated.Value(props.value))

    useEffect(()=>{
        Animated.timing(value, {
            toValue: props.value,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [props.value])

    const width = value.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    })

    return (
        <View style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            backgroundColor: 'white',
        }}>
            <Animated.View style={{
                width: '100%',
                height: width,
                backgroundColor: 'green',
            }}></Animated.View>
        </View>
    )
}

export default ProgressBar