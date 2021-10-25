import { create } from 'apisauce';
import cache from '../utility/cache';

const apiClient =  create({
    baseURL: 'http://172.16.48.188:9000/api'
})

const get = apiClient.get;
/**Redefing the actions of the get function */

/*apiClient.get = () => {
    get('')
}*/

//chag the actions that happen when info coms or goes to the server
apiClient.addResponseTransform(async response => {
    
    if(response.ok){
        //cache.store('data', response.data)
        //const data = await cache.get('data')
        //console.log(data)
        console.log(response)

        if(response.config?.method == 'get'){
            const url = response.config.url
            cache.store('data' , response.data)
        }

        return response
    }

    //if offline
    const data = await cache.get('data')
    console.log(data)
    return data ? {ok: true, data: data} : response
    
})


export default apiClient