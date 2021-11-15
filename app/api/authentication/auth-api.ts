import apiClient from "../client";
import { LoginInfo, RegisterInfo } from "./types";

const login_endpoint = 'user/login'
const reg_endpoint = 'user/register'

async function login(login_info: LoginInfo){
    return await apiClient.post(login_endpoint, login_info)
}

async function register(reg_info: RegisterInfo){
    return await apiClient.post(reg_endpoint, reg_info )
}

export default {
    login,
    register
}