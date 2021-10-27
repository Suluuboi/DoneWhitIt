import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useState } from "react";
import listingsApi from "../api/listings/listings-api";
import { Listings } from "../api/listings/types";

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

/*export default function useApi(apiFunc): ApiReturnType {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args: any[]) => {
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);

        setError(!response.ok);
        setData(response.data);
        return response;
    };

    return { data, error, loading, request };
}*/


/**
 export default function useApi(apiFunction: Promise<ApiErrorResponse<unknown> | ApiOkResponse<unknown>>){
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    
    async function request(){
        setLoading(true)
        const res = await apiFunction
        setLoading(false)

        if(!res.ok) return setError(true)

        setError(false)    
        setData(res.data as any)
    }

    return {error, data, loading, request} 
}
 
 */