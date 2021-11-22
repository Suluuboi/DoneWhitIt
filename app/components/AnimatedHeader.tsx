import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../config/colors';
import images from '../config/images';
import AppText from './AppText';

//const HEADER_HEIGHT = 200;
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

type AnimatedHeaderType = {
    animatedValue: Animated.Value,
    image : any,
    title: string,
    sub_title: string
}

function AnimatedHeader({animatedValue, image, title, sub_title}: AnimatedHeaderType){
    const insets = useSafeAreaInsets();

    const headerHeight = animatedValue.interpolate({
        inputRange: [
            0/**Starting Point */, 
            HEADER_MAX_HEIGHT + insets.top/**MAX wher allowed to scroll */
        ],
        outputRange: [
            HEADER_MAX_HEIGHT + insets.top, 
            insets.top + HEADER_MIN_HEIGHT
        ],
        extrapolate: 'clamp'
    });

    const imageContainerMargin = animatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + insets.top],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT + insets.top, insets.top + PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const profileImageHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + insets.top],
        outputRange: [PROFILE_IMAGE_MAX_HEIGHT + insets.top, insets.top + PROFILE_IMAGE_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const subTitleMargin = animatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + insets.top],
        outputRange: [0 , 50],
        extrapolate: 'clamp'
    })

    const titleFont = animatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + insets.top],
        outputRange: [14 , 24],
        extrapolate: 'clamp'
    })
  
    const subTitleOpacity = animatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT + insets.top],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    return (
        <>
            
            <Animated.View
                style={[styles.container, {height: headerHeight}]}
            >
                
                <Animated.View 
                    style={
                        [
                            styles.profile_header_container,
                            {
                                marginTop: imageContainerMargin
                            }
                        ]
                    }
                >
                    <View style={styles.content_row}>
                        <Animated.View style={
                                [
                                    styles.image_container,
                                    {
                                        width: profileImageHeight,
                                        height: profileImageHeight,
                                        borderRadius: profileImageHeight
                                    }
                                ]
                                    
                            }
                        >
                            <Image 
                                style={styles.image}
                                source={image}
                            />
                        </Animated.View>
                        <View style={styles.text_container}>
                            <Animated.Text 
                                style={
                                    [
                                        styles.text,
                                        {
                                            marginLeft: subTitleMargin,
                                            fontSize: titleFont,
                                        }
                                    ]
                                } 
                            >{title}</Animated.Text>
                            
                                <Animated.View style={{opacity: subTitleOpacity}}>
                                
                                    <AppText 
                                        style={styles.text} 
                                        text={sub_title}
                                    />
                                    
                                </Animated.View>
                            
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </>
    )
};

export default AnimatedHeader;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'lightblue'
    },
    profile_header_container:{
        marginLeft: 10,
        //zIndex: 20
    },
    content_row:{
        flexDirection: 'row',
        alignItems: null
    },
    image_container:{
        //height: PROFILE_IMAGE_MAX_HEIGHT,
        //width: PROFILE_IMAGE_MAX_HEIGHT,
        //borderRadius: PROFILE_IMAGE_MAX_HEIGHT/2,
        borderColor: colors.white,
        borderWidth: 3,
        overflow: 'hidden',
        //marginTop: 10//HEADER_MAX_HEIGHT-(PROFILE_IMAGE_MAX_HEIGHT/2),
    },
    image:{
        flex: 1,
        width: null,
        height: null
    },
    text_container:{
        marginLeft: 10
    },
    text:{
        color: colors.white,
        flexWrap: 'wrap'
    }
})
