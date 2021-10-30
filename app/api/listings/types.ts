import { ImagePickerResult } from "expo-image-picker"
import { ImageSourcePropType } from "react-native"

export type ExpoImageInfo = {
    url : string,
    thumbnailUrl: string,
    uri?: string,
    cancelled?: false, 
    type?: string,  
    width?: number, 
    height?: number, 
    exif?: any, 
    base64?: string
}

export type location = {
    latitude:number,
    longitude:number
} 

export type category = {
    value: string
}

export type Listing = {
    id          :   number,
    title       :   string,
    description :   string, 
    images      :   ExpoImageInfo[],
    category    ?:  category
    price       :   number,
    categoryId  :   number,
    userId      :   number,
    location    ?:   location
}