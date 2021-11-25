import React, { useRef } from "react";
import { Animated, FlatList, View } from "react-native";

import AnimatedCollapsingHeader from "../components/AnimatedCollapsingHeader";
import AppHeader from "../components/AppHeader";

const a = [1, 2,3, 4, 5] as number[]

const HEADER_HEIGHT = 70

export default function AnimatedListLayoutTestScreen(){

    function containers(){
    
        return(
          <View style={{width: '100%', height: 300, backgroundColor: 'green', marginVertical: 10}}/>
        )
      
    }
  
    const scrollY = useRef(new Animated.Value(10)).current;

    return(
        <AnimatedCollapsingHeader
            subHeaderHeightPercentage={13}
            headerHightPixel={HEADER_HEIGHT}
            animatedValue={scrollY}
            headerComponent={<AppHeader header_height={HEADER_HEIGHT} />}
        >
        <FlatList
            data={a}
            keyExtractor={(item)=>item.toString()}
            renderItem={({item})=>
                containers()
            }
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )
            }
        />
        </AnimatedCollapsingHeader>
    )
}