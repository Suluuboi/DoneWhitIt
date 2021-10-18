import AnimatedLottieView from 'lottie-react-native';
import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import * as Progress from 'react-native-progress' 
import colors from '../config/colors';
import lottie from '../config/lottie-animations';

/**SHow a progress bar when visable is true */

type UploadScreenProps={
    progress: number;
    visable: boolean;
    onDone: ()=>void
}

export default function UploadScreen({progress=0, visable=false, onDone}: UploadScreenProps) {
    return (
        <Modal visible={visable}>
            <View style={styles.container}>
                {/**<Text>{progress*100}%</Text>*/}
                {/**<Progress.Bar color={colors.primary} progress={progress}/>*/}
                {
                    /*progress < 1 ?(<ProgressBar progress={0.5} color={colors.primary} style={{width: 200}} />): (<AnimatedLottieView style={styles.complete} onAnimationFinish={onDone} source={lottie.done}/>)*/
                    progress < 1 ?
                    (
                        <ProgressBar progress={0.5} color={colors.primary} style={{width: 200}} />
                    )
                    :
                    (
                        <AnimatedLottieView 
                            autoPlay
                            loop={false}
                            style={styles.complete} 
                            onAnimationFinish={onDone} source={lottie.done}
                        />
                    )
                }
            </View>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'

    },
    complete:{
        width: 150,
        height: 150
    }
})
