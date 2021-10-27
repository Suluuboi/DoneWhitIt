import { create } from 'apisauce';
import cache from '../utility/cache';

const apiClient =  create({
    baseURL: 'http://192.168.178.33:9000/api'
})

const get = apiClient.get
/**Edditing the get function */
/** update the cache with every successfull request, if there is data in the cache display oflinde data */
apiClient.get = async (url, params, axiosConfig) =>{
    const response = await get<any>(url, params, axiosConfig)
    if (response.ok) {

        cache.store(url, response.data);

        return response;
    }
 
    const data = await cache.get(url);

    return data ? { ok: true, data: data } as any : response;
}


export default apiClient