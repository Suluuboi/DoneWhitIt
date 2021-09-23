import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Text, Image ,View } from 'react-native'
import AppButton from '../components/AppButton'
import colors from '../config/colors'

export default class WelcomScreen extends Component {
    render() {
        return (
            <ImageBackground 
                style={styles.background} 
                source={require("../assets/images/background.jpg")}
                blurRadius={2}
            >

                <View style={styles.logo_container}>
                    <Image 
                        style={styles.image} 
                        source={require("../assets/images/logo-red.png")}>
                    </Image>

                    <Text style={styles.tagline}>Sell what you dont need.</Text>

                </View>

                <View style={styles.buttons_container}>
                    <AppButton  
                        text={"Login"} 
                        onPress={()=>console.log("Login button pressed")} 
                    />
                    <AppButton 
                        text={"Register"} 
                        button_color={colors.secondary} 
                        onPress={()=>console.log("Register Button Pressed")} 
                    />
                </View>
                
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    background:{
        flex:1,
        //justifyContent: "center"
    },
    logo_container:{
        alignItems:"center",
        top: 50
    },
    image:{
        width:100,
        height:100
    },
    tagline:{
        marginVertical: 10,
        fontWeight: "600",
        fontSize: 18
    },
    buttons_container:{
        flex:1,
        padding:10,
        justifyContent:"flex-end"
    }

})