import apiClient from "../client"
import { Listings } from "./types";

const listings = '/listings';

function getListings(){
    return apiClient.get(listings).then((res)=>{
        return res
    })
}

export default {
    getListings
}