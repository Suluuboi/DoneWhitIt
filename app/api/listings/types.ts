export type ImageInfo = {
    url : string,
    thumbnailUrl: string,
    uri?: string,
}

export type location = {
    latitude:number,
    longitude:number
} 

export type category = {
    value: string
}

export type Listings = {
    id          :   number,
    title       :   string,
    description :   string, 
    images      :   ImageInfo[],
    category    ?:  category
    price       :   number,
    categoryId  :   number,
    userId      :   number,
    location    :   location
}