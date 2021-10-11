import apiClient from "../client"
import { Listings } from "./types";

const listings = '/listings';

function getListings(){
    return apiClient.get(listings).then((res)=>{
        if(!res.ok){
            console.log(res.problem)
        }
        return res
    })
}

export default {
    getListings
}
