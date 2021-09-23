import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, SafeAreaView } from 'react-native'

export class ViewImageScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>

                    <View style={styles.buttons_row}>
                        <View style={styles.left_button} />
                        <View style={styles.right_button} />
                    </View>
                    

                    <Image 
                        style={styles.image} 
                        source={require('../assets/images/chair.jpg')}
                    />

                    
                </View>
            </SafeAreaView>
        )
    }
}

export default ViewImageScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#000"
    },
    buttons_row:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    left_button:{
        backgroundColor: "#fc5c65",
        width:50,
        height:50,
        top:40,
        left:30,
        //position: "absolute"
    },
    right_button:{
        backgroundColor:"#4ecdc4",
        width:50,
        height:50,
        top:40,
        right:30,
        position: "absolute"
    },
    image:{
        width: "100%",
        height:"100%",
        resizeMode:"contain"
    }
})
