export type CacheItem = {
    data : any // the data to be saved in the cache
    time_stamp: number
}

export type FilterValues = {
    price ?: any[],//eg. [10, 20] //price range
    categoryId ?: number
} 

export type Filter = {
    search?: string,
    filter?: FilterValues
}