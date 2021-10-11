export type ImageInfo = {
    url : string,
    thumbnailUrl: string
}

export type location = {
    latitude:number,
    longitude:number
} 

export type Listings = {
    id          :   number,
    title       :   string,
    images      :   ImageInfo[],
    price       :   number,
    categoryId  :   number,
    userId      :   number,
    location    :   location
}