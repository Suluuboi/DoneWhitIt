import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'

import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import colors from '../config/colors'
import images from '../config/images'

export default function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login(){
        console.log({email: email, password: password})
    }

    return (
        <CustomSafeAreaView style={styles.container}>
            <Image
                source={images.logo}
                style={styles.logo}
            />
                
            <Formik
                initialValues={{email:'', password:''}}
                onSubmit={values=>console.log(values)}
            >
                {({handleChange, handleSubmit}) => (
                    <>
                        <AppTextInput 
                            icon_name="email" 
                            placeholder={"email"}
                            autoCorrect={false}
                            onChange={handleChange('email')}    
                        />

                        <AppTextInput
                            textContentType={"password"}
                            icon_name={"key"}
                            placeholder={"password"}
                            keyboardType={"default"}
                            secureTextEntry
                            onChange={(password)=>setPassword(password)}
                        />

                        <AppButton 
                            text={"Logon"}
                            button_color={colors.primary} 
                            onPress={()=>login()}
                        />
                    </>
                )}
            </Formik>

            
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    logo:{
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20
    }
})
