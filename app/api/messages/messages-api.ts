import authStorage from "../../auth/auth-storage"
import apiClient from "../client"

const endpoint = '/messages'

async function get(){
    const user = await authStorage.getUser();
    const res = await apiClient.get(endpoint, user)
    //console.log(res)
    return res
    //return user_id
}

function send(message, listing_id){
    return apiClient.post(endpoint,{
        message: message,
        listingId:listing_id
    })
}

export default{
    send, get
}