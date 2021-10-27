import React,{useState} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Yup from 'yup' 
import authApi from '../api/authentication/auth-api';
import { RegisterInfo } from '../api/authentication/types';
import AppText from '../components/AppText';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import ErrorMessage from '../components/form/ErrorMessage';
import { AppFormFieldFormik, AppFormFormik, AppSubmitButtonFormik } from '../components/form/formik';
import LoadingActivity from '../components/LoadingActivity';
import colors from '../config/colors';
import images from '../config/images';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';

const validation_schema = Yup.object().shape({
    name: Yup.string().required().min(4).label('Name'),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

function RegisterScreen(){

    const registerApi =  useApi(authApi.register)
    const loginApi    =  useApi(authApi.login)
    const [registerFailed, setRegisterFailed] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [ notifyUser, setNotifyUser ] = useState('')
    const { logIn } = useAuth()

    async function registerUser( details: RegisterInfo ){

        setErrorMessage('')
        setNotifyUser('')

        setNotifyUser('Registering user')
        const res = await registerApi.request(details)
        
        if(!res.ok){
            const err : any = res.data
            if(err){
                setErrorMessage(err.error)
                setRegisterFailed(true);
            }else{
                setErrorMessage("An Unexpected error occured")
            }
            setNotifyUser('')
            return 
        }
        setRegisterFailed(false)
        setNotifyUser('Loging user in')
        const { data : auth_token } = await authApi.login({ 
                                    email: details.email, 
                                    password: details.password
                                })

        logIn(auth_token as string)
        
    }

    return (
        <CustomSafeAreaView style={styles.container}>
            <Image
                source={images.logo}
                style={styles.logo}
            />
                
            <AppFormFormik
                initialValues={{name:'',email:'', password:''}}
                onSubmit={values=>registerUser(values)}
                validationSchema={validation_schema}
            >
                <ErrorMessage error={errorMessage} visable={registerFailed}/> 
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
                <LoadingActivity visable={registerApi.loading || loginApi.loading}   />
                {
                    <View style={styles.notify_container}>
                        <AppText    
                            style={styles.notify} 
                            text={notifyUser} 
                        />
                    </View>
                }
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
    },
    notify_container:{
        alignItems: "center"
    },
    notify:{
        color: colors.primary
    }
});
