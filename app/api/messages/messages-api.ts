import apiClient from "../client"

const endpoint = '/messages'

function send(message, listing_id){
    return apiClient.post(endpoint,{
        message: message,
        listingId:listing_id
    })
}

export default{
    send
}