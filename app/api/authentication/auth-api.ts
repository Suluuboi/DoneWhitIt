import apiClient from "../client";
import { LoginInfo } from "./types";

const endpoint = '/auth'

async function login(login_info: LoginInfo){
    return await apiClient.post(endpoint, {
            "email":login_info.email, 
            "password": login_info.password
        }
    )
}

export default {
    login
}