import { ImagePickerResult } from "expo-image-picker"
import { ImageSourcePropType } from "react-native"

export type ExpoImageInfo = {
    //url : string,
    thumbnailUrl: string,
    uri?: string,
    cancelled?: false, 
    type?: string,  
    width?: number, 
    height?: number, 
    exif?: any, 
    base64?: string,
    name        ?: string //this value is only on the server side and will be used to create 'thumbnailUrl' and uri
}

export type location = {
    latitude:number,
    longitude:number
} 

export type category = {
    value: string
}

export type Listing = {
    listingId   :   string,
    title       :   string,
    description :   string, 
    images      :   ExpoImageInfo[],
    category    ?:  category
    price       :   number | string,
    categoryId  :   number,
    userId      :   number,
    location    ?:   location
}

export type WhereQueryOptions = {
    //{key:'catedoryId', operation: '=', value: 2}
    key: string,
    operation: string,
    value: any
}