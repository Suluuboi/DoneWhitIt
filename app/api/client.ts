import { create } from 'apisauce';
import authStorage from '../auth/auth-storage';
import cache from '../utility/cache';

const apiClient =  create({
    baseURL: 'http://172.16.48.188:9000/api'
})

//change request befor sending itto the server
apiClient.addAsyncRequestTransform(async(request)=>{
    const auth_token = await authStorage.getToken();
    if(!auth_token) return
        request.headers["x-auth-token"] = auth_token
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