import React, { useState } from 'react'
import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AppText from '../components/AppText';
import colors from '../config/colors';
import images from '../config/images';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export default function MyListingsScreen() {
    const animated = new Animated.Value(300)
    const [scrollY, setScrollY] = useState<Animated.Value>(animated)

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT]
    })

    return (
        <View style={styles.container}>

            <Animated.View 
                style={[
                        styles.header, 
                        {height: headerHeight}
                    ]}
                />

            <ScrollView 
                onScroll={Animated.event(
                    [{nativeEvent:{contentOffset:{y:scrollY}}}],
                    {useNativeDriver: false}
                )}
                //scrollEventThrottle={}
                style={styles.scroll_view}
            >

                <View style={styles.profile_header_container}>
                    <View style={styles.image_container}>
                        <Image 
                            style={styles.image}
                            source={images.wear_mask}
                        />
                    </View>
                    <AppText text={'NAME/E-MAIL'}/>
                </View>

                <View 
                    style={{
                        height: 400, 
                        width: 400, 
                        backgroundColor: 'green',
                        marginBottom: 10
                        }}
                ></View>

                <View 
                    style={{
                        height: 400, 
                        width: 400, 
                        backgroundColor: 'tomato',
                        marginBottom: 10
                        }}
                ></View>

                <View 
                    style={{
                        height: 400, 
                        width: 400, 
                        backgroundColor: 'gold',
                        marginBottom: 10
                        }}
                ></View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        //height: headerHight,
        backgroundColor: 'lightskyblue'
    },
    scroll_view:{
        flex: 1
    },
    profile_header_container:{
        marginLeft: 10 
    },
    image_container:{
        height: PROFILE_IMAGE_MAX_HEIGHT,
        width: PROFILE_IMAGE_MAX_HEIGHT,
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
        borderColor: colors.white,
        borderWidth: 3,
        overflow: 'hidden',
        marginTop: HEADER_MAX_HEIGHT-(PROFILE_IMAGE_MAX_HEIGHT/2),
    },
    image:{
        flex: 1,
        width: null,
        height: null
    }

})

