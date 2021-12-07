import React, { useRef } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";

import AnimatedHeader2 from "../components/AnimatedHeader2";

type co = {
    id: string,
    color: string
  }

  
const a : co[] = [
    {id:'1', color: 'green'}, 
    {id:'2', color: 'red'},
    {id: '3', color: 'gold'},
    {id: '4', color: 'orange'},
    {id: '5', color: 'blue'},
    {id: '6', color: 'skyblue'}
]

function containers(color: string){
    
    return(
      <View style={{width: '100%', height: 300, backgroundColor: color , marginVertical: 10}}/>
    )
  
}

export default function List(){

    const scrollY = useRef(new Animated.Value(0)).current;

    return(
        
        <AnimatedHeader2 
            headerHeightPersentage={20}
            headerBackgroundColor={'pink'}
            animatedValue={scrollY} 
        >
            <FlatList
                data={a as co[]}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>
                    containers(item.color)
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            />
        </AnimatedHeader2>
    )
}


