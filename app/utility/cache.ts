
/**A utitlity that handels data to saved info on the system cache using async-storage */

import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { CacheItem } from "./types"

const prefix = 'cache-';
const expiry_in_minutes = 5

/**Store the data in the cache under the given key   */
async function store(key: string, data: any){
    try {
        const item : CacheItem = {
            data : data,
            time_stamp: Date.now()
        }

        await AsyncStorage.setItem(prefix + key, JSON.stringify(item))

    } catch (error) {
        console.log(error)
    }
    
}

/**check if value in cache is expired */
function isExpired(item: CacheItem){
    const now = moment(Date.now())
    const stored_time = moment(item.time_stamp)
    const is_expired = now.diff(stored_time, 'minutes') > expiry_in_minutes
    
    return is_expired
}

/**Get the value from the cache if not expired yet , if expired clear the cache */
async function get(key: string){
    try {
        
        const value = await AsyncStorage.getItem(prefix + key ) //as CacheItem | null
        const item = value && JSON.parse(value) as CacheItem
        if(!item) return null
        
        if(!value) return null

        if(isExpired(item)){
            //console.log('has expired')
            await AsyncStorage.removeItem(prefix + key)
            return null
        }
        

        return item.data

    } catch (error) {
        console.log(error)
    }
    
}

export default {
    store,
    get
}