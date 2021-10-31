import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useState } from "react";

interface ApiReturnType {
    data: any[];
    error: boolean;
    loading: boolean;
    request: (...args: any[]) => Promise<ApiErrorResponse<unknown>>;
}

/*****  Get data from the server    */

export default function useApi(apiFunc): ApiReturnType{
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    
    async function request(...args){
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);

        setError(!response.ok);
        setData(response.data);
        return response;
    
    }

    return {error, data, loading, request} 
}
