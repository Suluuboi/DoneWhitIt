import React, { useState } from 'react'
import { Image, StyleSheet} from 'react-native';
import * as Yup from 'yup' 

import CustomSafeAreaView from '../components/CustomSafeAreaView';
import images from '../config/images';
import {
    AppFormFieldFormik, 
    AppSubmitButtonFormik, 
    AppFormFormik
} from '../components/form/formik'

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
                
            <AppFormFormik
                initialValues={{email:'', password:''}}
                onSubmit={values=>console.log(values)}
                validationSchema={validation_schema}
            >
                        
                <AppFormFieldFormik
                    icon_name={"email"}
                    context_field_name={'email'} //same name as the from the validation fields
                    placeholder={'Email'}
                    autoFocus
                />
                <AppFormFieldFormik
                    icon_name={"lock"}
                    context_field_name={'password'} //same name as the from the validation fields
                    placeholder={'Password'}
                    textContentType={"password"}
                    keyboardType={"default"}
                    secureTextEntry
                />
                <AppSubmitButtonFormik label={'Login'} />
            </AppFormFormik>

            
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
