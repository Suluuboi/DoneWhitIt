import { create } from 'apisauce';
import authStorage from '../auth/auth-storage';
import cache from '../utility/cache';
import serverInfo from '../utility/serverInfo';

const apiClient =  create({
    baseURL: `${serverInfo.getServerUrl()}/api`
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

        //response.data
        response.data = await serverInfo.addFullAndThumbnailImage(response.data)

        const oldData = await cache.get(url);

        if(Array.isArray(oldData)){
            cache.store(url, [...oldData,...response.data]);//add the old to new data
        }else{
            cache.store(url, response.data);
        }

        return response;
    }
 
    const data = await cache.get(url);

    return data ? { ok: true, data: data } as any : response;
}


export default apiClient

