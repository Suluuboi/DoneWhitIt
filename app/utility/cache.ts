
/**A utitlity that handels data to saved on the sytems async storage memory */

import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { CacheItem } from "./types"

const prefix = 'cache';
const expiry_in_minutes = 5

async function store(key: string, item: CacheItem){
    try {
        item= {
            value: item.value,
            time_stamp: Date.now()
        }

        await AsyncStorage.setItem(prefix+ key, JSON.stringify(item))
        console.log('saved');
        

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
        
        const value = await AsyncStorage.getItem(prefix + key ) as CacheItem | null
        const item = JSON.stringify(value)

        if(!item) return null
        
        if(!value) return null

        if(isExpired(value)){
            await AsyncStorage.removeItem(prefix + key)
            return null
        }

        return value.value

    } catch (error) {
        console.log(error)
    }
    
}

export default {
    store,
    get
}