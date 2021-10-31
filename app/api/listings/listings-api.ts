import apiClient from "../client"
import { Listing } from "./types";

const listings = '/listings';

function getListings(){
    return apiClient.get(listings).then((res)=>{
        return res
    })
}

function addListing(listing:Listing, onUploadProgress: any){
    const data = new FormData()
    data.append('title', listing.title);
    data.append('price', listing.price as any)
    data.append('categoryId', listing.category?.value as any)
    data.append('description', listing.description)
    
    listing.images.forEach((image, index)=>{
        data.append('images',{
            name: 'image' + index,
            type: 'image/jpeg',
            uri: image.uri

        } as any)
    })

    if(listing.location)
        data.append('location', JSON.stringify(listing.location))

    return apiClient.post(listings, data, {
        onUploadProgress: progress=>onUploadProgress(progress.loaded / progress.total)
    })
}

export default {
    getListings, addListing
}
