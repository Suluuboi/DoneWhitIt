import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useState } from "react";
import listingsApi from "../api/listings/listings-api";
import { Listings } from "../api/listings/types";

export default function useApi(apiFunction: Promise<ApiErrorResponse<unknown> | ApiOkResponse<unknown>>){
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()

    /*****  Get data from the server    */
    async function request(){
        setLoading(true)
        const res = await apiFunction//listingsApi.getListings();
        setLoading(false)

        if(!res.ok) return setError(true)

        setError(false)    
        setData(res.data as any)
    }

    return {error, data, loading, request} 
}