import React,{useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Yup from 'yup' 
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import { AppFormFieldFormik, AppFormFormik, AppSubmitButtonFormik } from '../components/form/formik';
import images from '../config/images';

const validation_schema = Yup.object().shape({
    name: Yup.string().required().min(4).label('Name'),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

function RegisterScreen(){


    return (
        <CustomSafeAreaView style={styles.container}>
            <Image
                source={images.logo}
                style={styles.logo}
            />
                
            <AppFormFormik
                initialValues={{name:'',email:'', password:''}}
                onSubmit={values=>console.log(values)}
                validationSchema={validation_schema}
            >
                <AppFormFieldFormik
                    icon_name={"contacts"}
                    context_field_name={'name'} //same name as the from the validation fields
                    placeholder={'Name'}
                    autoFocus
                    multiline
                />
                        
                <AppFormFieldFormik
                    icon_name={"email"}
                    context_field_name={'email'} //same name as the from the validation fields
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                    multiline
                />
                <AppFormFieldFormik
                    icon_name={"lock"}
                    context_field_name={'password'} //same name as the from the validation fields
                    placeholder={'Password'}
                    keyboardType={"default"}
                    secureTextEntry={true}
                />

                <AppSubmitButtonFormik label={'Register'} />
            </AppFormFormik>

            
        </CustomSafeAreaView>
    )
};

export default RegisterScreen;

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
});
