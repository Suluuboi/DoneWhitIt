import apiClient from "../client"
import { Listings } from "./types";

const listings = '/listings';

function getListings(){
    return apiClient.get(listings).then((res)=>{
        return res
    })
}

function addListing(listing:Listings){
    const data = new FormData()
    data.append('title', listing.title);
    data.append('price', listing.price as any)
    data.append('categoryId', listing.categoryId as any)
    data.append('description', listing.description)
    
    listing.images.forEach((image, index)=>{
        data.append('images',{
            name: index,
            type: 'image/jpeg',
            uri: image.url

        } as any)
    })

    if(listing.location)
        data.append('location', JSON.stringify(listing.location))

    return apiClient.post(listings, data)
}

export default {
    getListings, addListing
}
