export type CacheItem = {
    data : any // the data to be saved in the cache
    time_stamp: number
}

export type FilterValues = {
    priceRange ?: any[],//eg. [10, 20]
    category ?: number
} 

export type Filter = {
    search?: string,
    filterValues?: FilterValues
}