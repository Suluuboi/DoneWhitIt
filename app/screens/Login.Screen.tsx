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

import { LoginInfo } from '../api/authentication/types';
import authApi from '../api/authentication/auth-api';
import ErrorMessage from '../components/form/ErrorMessage';
import useAuth from '../hooks/useAuth';

const validation_schema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

export default function LoginScreen() {
    const {logIn} = useAuth()
    const [loginFailed, setLoginFailed] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function login(details: LoginInfo){

        const res = await authApi.login(details)
        
        if(!res.ok){
            const err : any = res.data
            setErrorMessage(err.error)
            return setLoginFailed(true);
        } 

        setLoginFailed(false)
        logIn(res.data as string)
    }

    return (
        <CustomSafeAreaView style={styles.container}>
            <Image
                source={images.logo}
                style={styles.logo}
            />
                
            <AppFormFormik
                initialValues={{email:'', password:''}}
                onSubmit={values=>login(values)}
                validationSchema={validation_schema}
            >
                <ErrorMessage error={errorMessage} visable={loginFailed}/>        
                <AppFormFieldFormik
                    icon_name={"email"}
                    context_field_name={'email'} //same name as the from the validation fields
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                    autoFocus
                    multiline
                />
                <AppFormFieldFormik
                    icon_name={"lock"}
                    context_field_name={'password'} //same name as the from the validation fields
                    placeholder={'Password'}
                    keyboardType={"default"}
                    secureTextEntry={true}
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
