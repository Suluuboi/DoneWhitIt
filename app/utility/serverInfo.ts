import { number } from "yup/lib/locale";
import { Listing, WhereQueryOptions } from "../api/listings/types";
import { Filter } from "./types";

const initialIp = '172.16.48.219'
const initialPort = '9100';
const initialURL = `http://${initialIp}:${initialPort}`
const initialImagePath = `${initialURL}/assets` 

let timeOutId

function getIpAddress(){
    return initialIp
}

function getPort(){
    return initialPort
}

function getServerUrl(){
    return initialURL
}

function getImagePath(listing:Listing){
    return `${initialImagePath}/${listing.userId}/listing/${listing.listingId}`
}

/**
 * the image coming from sever only has a name
 * Add a thumbnail and full image 
 * {
 *      uri : 'image_name.jpg',
 *      thumbnailUrl: 'image_name.jpg'
 * }
 * */
 async function addFullAndThumbnailImage(serverData: any){ 
     
    if(!Array.isArray(serverData)) return serverData

    if(serverData[0]?.listingId){
        
        return serverData.map((listing: Listing)=>{

            var listing_images: any = undefined
            
            if(listing.images[0].name){

                listing_images =  listing.images.map(image=>{

                    const imagePath = getImagePath(listing)
                    const new_image = {
                        ...{
                            uri: `${imagePath}/${image.name}_full.jpg`,
                            thumbnailUrl: `${imagePath}/ ${image.name}_thumb.jpg`
                        }
                    }
    
                    return new_image
    
                })

            }

            

            listing.images = listing_images as any
            
            return listing;
        })
    }

    return serverData;

}

//format filter to one that is understuded by the server
function createSeverFilter(filter: Filter){
    //console.log(filter?.filter)
    const query: WhereQueryOptions[] = []

    //get from filter
    const f = filter?.filter

    if(f){

        const objectKeys = Object.keys(f)
        
        if(objectKeys.length > 0){//if there is any filter

            for(let key of objectKeys){

                const operation = getOperation(key)

                query.push({key:key, operation:operation, value: f[`${key}`]})
            }

        }
    }

    //get from the search

    if(filter?.search){

        const s  = filter?.search

        const objectKeys = Object.keys({search: s})

        for(let key of objectKeys){
            const operation = getOperation(key)
            query.push({key: `title`, operation: operation, value: `${filter[key]}%`})
        }

    }

    return query;
}

export default{
    getImagePath, getIpAddress, getPort, getServerUrl, addFullAndThumbnailImage, createSeverFilter
}

function getOperation(key){
    let operation = '='


    switch (key) {
        case 'categoryId':
        operation = '='
        break;

        case 'price':
            operation = 'BETWEEN'
            break;

        case 'search':
            operation = 'LIKE'
            break;
                
        default:
        operation = '='
        break;
    }
    return operation
}