import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup' 

import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import colors from '../config/colors'
import images from '../config/images';
import AppText from '../components/AppText';
import ErrorMessage from '../components/ErrorMessage';

const validation_schema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

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
                validationSchema={validation_schema}
            >
                {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <AppTextInput 
                            icon_name="email" 
                            placeholder={"email"}
                            autoCorrect={false}
                            onChangeText={handleChange('email')}    
                            onBlur={()=>setFieldTouched('email')}
                        />
                        {/** Error Message*/}
                        <ErrorMessage error={errors.email} visable ={ touched.email }/>
                        <AppTextInput
                            textContentType={"password"}
                            icon_name={"key"}
                            placeholder={"Password"}
                            keyboardType={"default"}
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={()=>setFieldTouched('password')}
                        />
                        {/*errors.password && <AppText style={{color:'red'}} text={errors.password }/>*/}
                        <ErrorMessage error={errors.password} visable={touched.password} />
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
