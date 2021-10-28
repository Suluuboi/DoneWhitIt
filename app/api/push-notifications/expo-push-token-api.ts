import apiClient from "../client";
import { TokenType } from "./type";

const endpoint = 'expoPushTokens'

/** Register to recieve push notifications */
async function register(token: TokenType){
    return await apiClient.post(endpoint, token )
}

export default {
    register
} 