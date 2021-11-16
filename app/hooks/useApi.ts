import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useState } from "react";
import openSocket from "socket.io-client";

import serverInfo from "../utility/serverInfo";

interface ApiReturnType {
    data: any[];
    error: boolean;
    loading: boolean;
    request: (...args: any[]) => Promise<ApiErrorResponse<unknown>>;
}

/*****  Get data from the server    */

export default function useApi(apiFunc, socketName?: string): ApiReturnType{
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>()
    const [listening, setListening] = useState(false)//check if the socketIO is enabled
    let data2 = []
    
    async function request(...args){
        setLoading(true);
        const response = await apiFunc(...args);
        setLoading(false);

        setError(!response.ok);
        setData(response.data);
        data2 = data.slice(0);
        return response;
    }

    return {error, data, loading, request} 
}

/** All the socketIO code */

const connectToListing = (socketName: string) => {
    const socket = openSocket(serverInfo.getServerUrl());
    console.log('connect successfully')
    socket.on(socketName/*"listing"*/, (date) => {
        //if (date.action === "create") createListing(date.listing);
        //if (date.action === "delete") deleteListing(date.listing);
        //if (date.action === "update") updateListing(date.listing);
    });
};

/*const fetchListings = async () => {
    const { data: items, ok: response } = await listingsApi.getListings();
    if (!response) return;

    listings2 = items.slice(0);
    setItems(items);
    setFetched(true);
};

const createListing = async function (listing) {
    //console.log('create new listing.');
    //console.log(listing)
    const listingWithImages = await serverInfo.addFullAndThumbnailImage([listing]);
    //console.log(listingWithImages);
    listings2.unshift(listingWithImages[0]);

    setItems(() => [...[], ...listings2]);
};

const updateListing = (listing) => {
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

