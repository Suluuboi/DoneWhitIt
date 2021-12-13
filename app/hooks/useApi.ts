import { ApiErrorResponse, ApiOkResponse, ApiResponse } from "apisauce";
import { useState } from "react";
import openSocket from "socket.io-client";

import serverInfo from "../utility/serverInfo";

interface ApiReturnType {
    data: any[];
    error: boolean;
    loading: boolean;
    end : boolean //have we reached the end
    request: (...args: any[]) => Promise<ApiResponse<unknown>>;
}

/*****  Get data from the server    */

export default function useApi(apiFunc, filterValue?, socketName?: string): ApiReturnType{
    const [ data, setData   ] = useState<any>([]);
    const [ error, setError ] = useState<boolean>()
    const [ loading, setLoading ] = useState<boolean>()
    const [ listening, setListening ] = useState<boolean>(false)//check if the socketIO is enabled
    const [ filter, setFilter ] = useState()
    const [ end, setEnd ] = useState<boolean>(false)
    let data2 = [];

    if(JSON.stringify(filterValue) === JSON.stringify(filter)){

    }else{
        console.log('new filter')
        
        setFilter(filterValue)
        setData([])
        setEnd(false)
    }
    
    async function request(...args){

        if(!end){

            setLoading(true);
            
            const response: ApiResponse<any> = await apiFunc(...args);
            setLoading(false);

            setError(!response.ok);

            if(response.data && Array.isArray(response.data)){//if array

                const limit = response.config?.params?.limit

                if(limit){
                    (response.data.length < limit) ? setEnd(true): null; 
                }

                setData(olData=>[...olData,...response.data]); //append new data to old data
            }
        

            //old code may need review
            if(socketName && !listening){
                
                if(response.ok && Array.isArray(response.data)){
                    data2 = response.data.slice(0);
                    connectToListing(socketName)
                }
                
            }
            
            return response;
        }
    }

    /** All the socketIO code */

    function connectToListing(socketName: string) {
        const socket = openSocket(serverInfo.getServerUrl());
        
        setListening(true)//ensure we only listen onse
        socket.on(socketName/*"listing"*/, (date) => {
            if (date.action === "create") createListing(date.listing);
            //if (date.action === "delete") deleteListing(date.listing);
            //if (date.action === "update") updateListing(date.listing);
        });
    };

    const createListing = async function (listing) {
        if(!error && listing){

            const listingWithImages = await serverInfo.addFullAndThumbnailImage([listing]);
            data2.unshift(listingWithImages[0]);

            setData(() => [...[], ...data2]);
        }
        
    };

    return {error, data, end ,loading, request} 
}



/*const fetchListings = async () => {
    const { data: items, ok: response } = await listingsApi.getListings();
    if (!response) return;

    listings2 = items.slice(0);
    setItems(items);
    setFetched(true);
};*/

/*const updateListing = (listing) => {
    let newListings = listings2.slice(0);
    newListings.map((obj) => {
    if (obj.listingId === listing.listingId) {
        obj.title = listing.title;
        obj.price = listing.price;
        obj.category = listing.category;
        obj.description = listing.description;
    }
    });

    setItems(newListings);
};

const deleteListing = (listing) => {
    listings2 = listings2.filter(function (obj) {
    return obj.listingId !== listing.listingId;
    });

    setItems(() => [...[], ...listings2]);
};*/

