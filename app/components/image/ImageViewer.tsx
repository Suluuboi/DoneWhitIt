import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Button, Image, ImageBackground, Modal, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import colors from '../../config/colors';
import { MaterialCommunityIconsSet } from '../icon/types';

/** View a view the image provided in full screen */

type ImageViewerType = {
    url                 : string,
    parent              : React.MutableRefObject<any>
    left_icon           ?: MaterialCommunityIconsSet
    handleLeftPress     ?: ()=>void,
    right_icon          ?: MaterialCommunityIconsSet,
    handleRightPress    ?: ()=>void
}

const ImageViewer = forwardRef  ((props, ref) => {

    const [modalVisable, setModalVisable] = useState(false);
    const [url, setUrl] = useState(null);
    const [icon, setIcon] = useState<MaterialCommunityIconsSet>(null)


    useImperativeHandle(ref, () => ({
        show(url:string, icon?: MaterialCommunityIconsSet) {
          setUrl(url)
          setIcon(icon)
          setModalVisable(true)
        }
    }));

    function goBack(){
        setModalVisable(false)
    }


    return (
        <Modal 
            style={{flex: 1}}
            visible={modalVisable}
            animationType={'slide'}
        >
                <View style={{flex:1}}>
                    <View style={styles.container}>

                        <ImageBackground
                            resizeMode={'contain'}
                            style={styles.image} 
                            source={{uri: url}}
                        />

                        <View style={styles.buttons_row}>
                            
                            < >
                                <TouchableWithoutFeedback  onPressIn={()=>goBack()} > 

                                    <MaterialCommunityIcons name={icon ? icon as any : "close"} color={colors.white} size={35}/>
                                </TouchableWithoutFeedback>
                            </>
                            
                            {/*<>
                                <TouchableWithoutFeedback  onPress={()=>goBack()} >
                                    <MaterialCommunityIcons name={"trash-can-outline"} color={colors.white} size={35}/>
                                </TouchableWithoutFeedback>
                            </>*/}
                        </View>
                        
                    </View>
                </View>
                
        </Modal>
    )
})

export default ImageViewer;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#000",
        zIndex: 20
    },
    buttons_row:{
        flexDirection:"row",
        justifyContent:"space-between",
        position: 'absolute',
        width: '100%',
        padding: 20
    },
    left_button:{
        top:40,
        left:30,
        position: "absolute"
    },
    right_button:{
        
        top:40,
        right:30,
        position: "absolute"
    },
    image:{
        width: "100%",
        height:"100%",
        resizeMode:"contain"
    },
    content: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: '#81C04D',
        flexDirection: 'row'
      },
      containerButton: {
        position: 'absolute',
        top: 30,
        left: 8
      },
      textCenter: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
      }
})



