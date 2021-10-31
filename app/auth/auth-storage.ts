/** this module is responsable for storing and retrieving the users  authentication tocken */

import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { JWTUserData } from './types';

const key = 'authToken'

async function storeToken(authToken){
    try {
        return await SecureStore.setItemAsync(key, authToken)
    } catch (error) {
        console.log('Error storing the auth token' , error );
    }
}

async function getToken(){
    try {
        return await SecureStore.getItemAsync(key)
    } catch (error) {
        console.log('Error getting the auth token' , error );
    }
}

async function getUser() {
    const token = await getToken()
    return (token) ? jwtDecode(token) as JWTUserData: null;
}

async function removeToken(){
    try {
        return await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('Error deleting the auth token' , error );
    }
}

export default {
    getUser, storeToken, removeToken, getToken
}